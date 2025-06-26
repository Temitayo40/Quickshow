import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookingDocument } from 'src/bookings/schema/booking.schema';
import { ShowDocument } from 'src/shows/schema/show.schema';
import { UserDocument } from 'src/users/schema/user.schema';

@Injectable()
export class AdminDashboardService {
  constructor(
    @InjectModel('Booking')
    private bookingModel: Model<BookingDocument>,
    @InjectModel('Show')
    private showModel: Model<ShowDocument>,
    @InjectModel('User')
    private userModel: Model<UserDocument>,
  ) {}

  async getDashboardData() {
    const bookings = await this.bookingModel.find({ isPaid: true });
    const activeShows = await this.showModel
      .find({
        showDateTime: { $gte: new Date() },
      })
      .populate('movie');

    const totalUser = await this.userModel.countDocuments();

    const dashboardData = {
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount, 0),
      activeShows,
      totalUser,
    };
    return dashboardData;

    // const [result] = await this.bookingModel.aggregate([
    //   { $match: { isPaid: true } },
    //   {
    //     $group: {
    //       _id: null,
    //       totalRevenue: { $sum: '$amount' },
    //       totalBookings: { $sum: 1 },
    //     },
    //   },
    // ]);

    // const dashboardData = {
    //   totalBookings: result?.totalBookings || 0,
    //   totalRevenue: result?.totalRevenue || 0,
    //   activeShows,
    //   totalUser,
    // };
  }

  async getAllShows() {
    const shows = await this.showModel
      .find({
        showDateTime: { $gte: new Date() },
      })
      .populate('movie')
      .sort({ showDateTime: 1 });

    return shows;
  }
  async getAllBookings() {
    const bookings = await this.bookingModel
      .find({})
      .populate('user')
      .populate({
        path: 'show',
        populate: { path: 'movie' },
      })
      .sort({ createdAt: -1 });

    return bookings;
  }
}
