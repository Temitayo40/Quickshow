// import { User } from 'src/users/schema/user.schema';
// import { inngest } from './inngest.client';

// export const syncUserRegistration = inngest.createFunction(
//   { id: 'sync-user-on-registration' },
//   { event: 'app/user.registered' },
//   async ({ event }) => {
//     const { userId, email, name, image } = event.data;

//     await User.create({
//       _id: userId,
//       email,
//       name,
//       image,
//     });
//   },
// );

// export const syncUserDeletion = inngest.createFunction(
//   { id: 'delete-user-on-request' },
//   { event: 'app/user.deleted' },
//   async ({ event }) => {
//     const { userId } = event.data;
//     await UserModel.findByIdAndDelete(userId);
//   },
// );

// export const syncUserUpdate = inngest.createFunction(
//   { id: 'update-user-on-profile-change' },
//   { event: 'app/user.updated' },
//   async ({ event }) => {
//     const { userId, email, name, image } = event.data;
//     await UserModel.findByIdAndUpdate(userId, { email, name, image });
//   },
// );

// export const releaseSeatsAndDeleteBooking = inngest.createFunction(
//   { id: 'release-seats-delete-booking' },
//   { event: 'app/checkpayment' },
//   async ({ event, step }) => {
//     const { bookingId } = event.data;
//     const tenMinutesLater = new Date(Date.now() + 10 * 60 * 1000);

//     await step.sleepUntil('wait-for-10-minutes', tenMinutesLater);

//     await step.run('check-payment-status', async () => {
//       const booking = await BookingModel.findById(bookingId);
//       if (!booking || booking.isPaid) return;

//       const show = await ShowModel.findById(booking.show);
//       booking.bookedSeats.forEach((seat) => {
//         delete show.occupiedSeats[seat];
//       });

//       show.markModified('occupiedSeats');
//       await show.save();
//       await BookingModel.findByIdAndDelete(booking._id);
//     });
//   },
// );

// export const functions = [
//   syncUserRegistration,
//   syncUserDeletion,
//   syncUserUpdate,
//   releaseSeatsAndDeleteBooking,
// ];
