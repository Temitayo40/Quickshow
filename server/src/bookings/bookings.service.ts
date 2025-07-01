import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from './schema/booking.schema';
import { Show, ShowDocument } from 'src/shows/schema/show.schema';
import { RpcException } from '@nestjs/microservices';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
// import { inngest } from 'src/inngest/inngest.client';

@Injectable()
export class BookingsService {
  private stripe: Stripe;
  constructor(
    private configService: ConfigService,

    @InjectModel(Booking.name)
    private bookingModel: Model<BookingDocument>,
    @InjectModel(Show.name)
    private showModel: Model<ShowDocument>,
  ) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY') || '',
      {
        apiVersion: '2025-05-28.basil',
      },
    );
  }

  async checkSeatsAvailability(showId: any, selectedSeats: any) {
    const showData = await this.showModel.findById(showId);
    if (!showData) return false;

    const occupiedSeats = showData.occupiedSeats;

    // const isAnySeatTaken = selectedSeats.some(
    //   (seat: string) => occupiedSeats[seat],
    // );
    const isAnySeatTaken = selectedSeats.some(
      (seat: string) => !!occupiedSeats[seat],
    );

    return !isAnySeatTaken;
  }

  async createBooking(
    showId: string,
    selectedSeats: string[],
    userId: string,
    origin: string,
  ) {
    const showData = await this.showModel.findById(showId).populate('movie');
    if (!showData) {
      throw new RpcException('Show not found');
    }

    const booking: BookingDocument = await this.bookingModel.create({
      user: userId,
      show: showId,
      amount: showData.showPrice * selectedSeats?.length,
      bookedSeats: selectedSeats,
    });

    selectedSeats.map((seat) => {
      showData.occupiedSeats[seat] = userId;
    });

    showData?.markModified('occupiedSeats');
    await showData?.save();

    const line_items = [
      {
        price_data: {
          currency: 'USD',
          unit_amount: Math.floor(booking.amount) * 100,
          product_data: {
            name: showData.movie.title,
          },
        },
        quantity: 1,
      },
    ];

    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: line_items,
      success_url: `${origin}/loading/my-bookings`,
      cancel_url: `${origin}/my-bookings`,
      metadata: {
        bookingId: booking._id.toString(),
      },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
    });

    booking.paymentLink = session.url ?? '';
    // booking.isPaid = true;
    await booking.save();
    // console.log('🔐 Using Inngest Key:', process.env.INNGEST_EVENT_KEY);

    // await inngest.send({
    //   name: 'app/checkpayment',
    //   data: {
    //     bookingId: booking._id.toString(),
    //   },
    // });

    return session;
  }

  async getOccupiedSeats(showId: string) {
    const bookings = await this.bookingModel.find({ show: showId });

    const occupiedSeats = bookings.flatMap((booking) => booking.bookedSeats);

    return occupiedSeats;
  }

  getStripeInstance() {
    return this.stripe;
  }
}
