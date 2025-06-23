import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookingDocument } from './schema/booking.schema';
import { ShowDocument } from 'src/shows/schema/show.schema';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel('Booking')
    private bookingModel: Model<BookingDocument>,
    @InjectModel('Show')
    private showModel: Model<ShowDocument>,
  ) {}

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

  async createBooking(showId: string, selectedSeats: string[], userId: string) {
    const showData = await this.showModel.findById(showId).populate('movie');
    if (!showData) {
      throw new RpcException('Show not found');
    }
    const booking = await this.bookingModel.create({
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
    return booking;
  }

  async getOccupiedSeats(showId: string) {
    const showData = await this.showModel.findById(showId);
    if (!showData) {
      throw new RpcException('Show not found');
    }
    return Object.keys(showData.occupiedSeats);
  }
}
