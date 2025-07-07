import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from 'src/bookings/schema/booking.schema';
import { MailService } from 'src/mail/mail.service';
import { Show, ShowDocument } from 'src/shows/schema/show.schema';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { inngest } from './inngest.client';
import type { GetStepTools } from 'inngest';
// import { GetFunctionInput } from 'inngest';

@Injectable()
export class InngestService {
  constructor(
    @InjectModel(Booking.name)
    private bookingModel: Model<BookingDocument>,

    @InjectModel(Show.name)
    private showModel: Model<ShowDocument>,

    @InjectModel(User.name)
    private userModel: Model<UserDocument>,

    private mailService: MailService,
  ) {}

  syncUserRegistration = inngest.createFunction(
    { id: 'sync-user-on-registration' },
    { event: 'app/user.registered' },
    async ({
      event,
    }: {
      event: {
        data: { userId: string; email: string; name: string; image?: string };
      };
    }) => {
      const { userId, email, name, image } = event.data;

      await this.userModel.create({
        _id: userId,
        email,
        name,
        image,
      });
    },
  );

  syncUserDeletion = inngest.createFunction(
    { id: 'delete-user-on-request' },
    { event: 'app/user.deleted' },
    async ({
      event,
    }: {
      event: {
        data: { userId: string };
      };
    }) => {
      const { userId } = event.data;
      await this.userModel.findByIdAndDelete(userId);
    },
  );

  syncUserUpdate = inngest.createFunction(
    { id: 'update-user-on-profile-change' },
    { event: 'app/user.updated' },
    async ({
      event,
    }: {
      event: {
        data: { userId: string; email: string; name: string; image?: string };
      };
    }) => {
      const { userId, email, name, image } = event.data;
      await this.userModel.findByIdAndUpdate(userId, { email, name, image });
    },
  );

  releaseSeatsAndDeleteBooking = inngest.createFunction(
    { id: 'release-seats-delete-booking' },
    { event: 'app/checkpayment' },
    async ({
      event,
      step,
    }: {
      event: {
        data: {
          bookingId: string;
        };
      };
      step: GetStepTools<any>;
    }) => {
      const { bookingId } = event.data;
      const tenMinutesLater = new Date(Date.now() + 10 * 60 * 1000);

      await step.sleepUntil('wait-for-10-minutes', tenMinutesLater);

      await step.run('check-payment-status', async () => {
        const booking = await this.bookingModel.findById(bookingId);
        if (!booking || booking.isPaid) return;

        const show = await this.showModel.findById(booking.show);
        if (!show) throw new Error('Show not found');

        booking.bookedSeats.forEach((seat) => {
          delete show.occupiedSeats[seat];
        });

        show.markModified('occupiedSeats');
        await show.save();
        await this.bookingModel.findByIdAndDelete(booking._id);
      });
    },
  );

  sendBookingConfirmationEmail = inngest.createFunction(
    { id: 'send-booking-confirmation-email' },
    { event: 'app/show.booked' },
    async ({
      event,
      step,
    }: {
      event: {
        data: {
          bookingId: string;
        };
      };
      step: GetStepTools<any>;
    }) => {
      const { bookingId } = event.data;
      const booking = await this.bookingModel
        .findById(bookingId)
        .populate({
          path: 'show',
          populate: { path: 'movie', model: 'Movie' },
        })
        .populate('user');

      if (!booking || !booking.show || !booking.user || !booking.show.movie) {
        return;
      }
      this.mailService.sendMail({
        to: booking.user.email,
        subject: `payment confirmation: ${booking.show.movie.title}`,
        body: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>Hi ${booking.user.name},</h2>
          <p>
            Your booking for <strong style="color: #F84565;">"${booking.show.movie.title}"</strong> is confirmed.
          </p>
          <p>
            <strong>Date:</strong> ${new Date(booking.show.showDateTime).toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata' })}<br/>
            <strong>Time:</strong> ${new Date(booking.show.showDateTime).toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' })}
          </p>
          <p>Enjoy the show!</p>
          <p>Thanks for booking with us!<br/>– FreeRealm Team</p>
        </div>
      `,
      });
    },
  );

  functions() {
    return [
      this.syncUserRegistration,
      this.syncUserDeletion,
      this.syncUserUpdate,
      this.releaseSeatsAndDeleteBooking,
      this.sendBookingConfirmationEmail,
    ];
  }
}
