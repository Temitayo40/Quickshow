import { Controller, Post, Req, Res, Headers } from '@nestjs/common';
import Stripe from 'stripe';
import { Request, Response } from 'express';
import { BookingsService } from 'src/bookings/bookings.service';
import { InjectModel } from '@nestjs/mongoose';
import { Booking, BookingDocument } from 'src/bookings/schema/booking.schema';
import { Model } from 'mongoose';
// import { inngest } from 'src/inngest/inngest.client';

@Controller('api/webhook')
export class WebhookController {
  constructor(
    private bookingService: BookingsService,
    @InjectModel(Booking.name)
    private bookingModel: Model<BookingDocument>,
  ) {}

  @Post()
  async handleWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('stripe-signature') sig: string,
  ) {
    const stripeInstance = this.bookingService.getStripeInstance();
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!endpointSecret) {
      console.log('Webhook Error: STRIPE_WEBHOOK_SECRET is not set');
      return res
        .status(500)
        .send('Webhook Error: STRIPE_WEBHOOK_SECRET is not set');
    }

    let event: Stripe.Event;

    try {
      event = stripeInstance.webhooks.constructEvent(
        req.body,
        sig,
        endpointSecret,
      );
    } catch (err) {
      console.log('Webhook Error:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        const paymentIntentId = paymentIntent.id;

        const session = await stripeInstance.checkout.sessions.list({
          payment_intent: paymentIntentId,
        });

        if (!session.data.length || !session.data[0].metadata) {
          return res.status(400).json({ error: 'Session metadata missing' });
        }

        const { bookingId } = session.data[0].metadata;

        await this.bookingModel.findByIdAndUpdate(bookingId, {
          isPaid: true,
          paymentLink: '',
        });
        // await inngest.send({ name: 'app/show.booked', data: bookingId });
        break;
      }

      default:
        console.log('unhandled event type');
    }

    res.sendStatus(200).send({ received: true });
  }
}
