// import { Inngest } from 'inngest';
// import User from '../model/user.js';
// import { Booking } from 'src/bookings/schema/booking.schema.js';
// import { Show } from 'src/shows/schema/show.schema.js';

// export const inngest = new Inngest({ id: 'movie-ticket-booking' });

// // ingest function to save user data to a database
// const syncUserCreation = inngest.createFunction(
//   { id: 'sync-user-from-clerk' },
//   { event: 'clerk/user.created' },
//   async ({ event }) => {
//     const { id, first_name, last_name, email_addresses, image_url } =
//       event.data;
//     const userData = {
//       _id: id,
//       email: email_addresses[0].email_address,
//       name: first_name + last_name,
//       image: image_url,
//     };

//     await User.create(userData);
//   },
// );
// const syncUserDeletionn = inngest.createFunction(
//   { id: 'delete-user-with-clerk' },
//   { event: 'clerk/user.deleted' },
//   async ({ event }) => {
//     const { id } = event.data;

//     await User.findByIdAndDelete(id);
//   },
// );

// const syncUserUpdation = inngest.createFunction(
//   { id: 'update-user-from-clerk' },
//   { event: 'clerk/user.updated' },
//   async ({ event }) => {
//     const { id, first_name, last_name, email_addresses, image_url } =
//       event.data;
//     const userData = {
//       _id: id,
//       email: email_addresses[0].email_address,
//       name: first_name + last_name,
//       image: image_url,
//     };

//     await User.findByIdAndUpdate(id, userData);
//   },
// );

// // ingest function to cancel  bookingand realease seats of show after 10 mins of booking crrated if payment is not made
// const releaseSeatsAndDeleteBooking = inngest.createFunction(
//   { id: 'release-seats-delete-booking' },
//   { event: 'app/checkpayment' },
//   async ({ event }) => {
//     const tenMinutesLater = new Date(Date.now() + 10 * 60 * 10000);
//     await step.sleepUntil('wait-for-10-minutes', tenMinutesLater);
//     await step.run('check-payment-status', async () => {
//       const bookingId = event.data.bookingId;
//       const booking = await Booking.findById(bookingId);

//       if (!booking.isPaid) {
//           const show = await Show.findById(booking.show); booking.bookedSeats..forEach(seat => {
//             delete show.occupiedSeats[seat]

//           });
//           show.markModified('occupiedSeats')
//           await show.save()
//           await Booking.findByIdAndDelete(booking._id)
//       }
//     });
//   },
// );

// export const functions = [
//     releaseSeatsAndDeleteBooking,
//   syncUserCreation,
//   syncUserDeletionn,
//   syncUserUpdation,
// ];
