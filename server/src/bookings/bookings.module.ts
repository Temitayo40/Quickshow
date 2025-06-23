import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingSchema } from './schema/booking.schema';
import { ShowsModule } from 'src/shows/shows.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Booking', schema: BookingSchema }]),
    ShowsModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService, MongooseModule],
})
export class BookingsModule {}
