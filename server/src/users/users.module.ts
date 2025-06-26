import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from './schema/user.schema';
import { BookingsModule } from 'src/bookings/bookings.module';
import { MoviesModule } from 'src/movies/movies.module';
import { Booking, BookingSchema } from 'src/bookings/schema/booking.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Booking.name, schema: BookingSchema },
    ]),
    BookingsModule,
    MoviesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, MongooseModule],
})
export class UsersModule {}
