import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './schema/booking.schema';
import { ShowsModule } from 'src/shows/shows.module';
import { Show, ShowSchema } from 'src/shows/schema/show.schema';

// MongooseModule.forFeature([{ name: 'Booking', schema: BookingSchema }]),
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: Show.name, schema: ShowSchema },
    ]),
    ShowsModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService, MongooseModule],
})
export class BookingsModule {}
