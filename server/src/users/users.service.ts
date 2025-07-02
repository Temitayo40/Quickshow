import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserRole } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { BookingDocument } from 'src/bookings/schema/booking.schema';
import { MovieDocument } from 'src/movies/schema/movie.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel('Booking') private bookingModel: Model<BookingDocument>,
    @InjectModel('Movie') private movieModel: Model<MovieDocument>,
  ) {}

  async createUser(data: Partial<User>) {
    const payload = { ...data };
    if (data.password) {
      payload.password = await bcrypt.hash(data.password, 10);
    }

    const newUser = new this.userModel(payload);
    return newUser.save();
  }

  async getUserBookings(user: string) {
    const bookings = await this.bookingModel
      .find({ user })
      .populate({
        path: 'show',
        populate: { path: 'movie' },
      })
      .sort({ createdAt: -1 });

    return bookings;
  }

  async findByEmail(email: string, includePassword = false) {
    if (includePassword) {
      return this.userModel.findOne({ email }).select('+password').exec();
    }
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string) {
    return this.userModel.findById(id);
  }

  async updateUser(id: string, data: Partial<User>) {
    return this.userModel.findByIdAndUpdate(id, data, { new: true });
  }

  async updateFavorite(userId: string, movieId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (user.favorites.includes(movieId)) {
      user.favorites = user.favorites.filter((id) => id !== movieId);
    } else {
      user.favorites.push(movieId);
    }

    return user.save();
  }

  async updateUserRole(userId: string, role: UserRole) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (user.role) {
      user.role = role;
    } else {
      throw new Error('Role not found');
    }

    return user.save();
  }

  async getUserFavorites(userId: string): Promise<string[]> {
    const user = await this.userModel.findById(userId);
    const favorites = user?.favorites || [];
    return await this.movieModel.find({ tmdbId: { $in: favorites } });

    // console.log(
    //   'User favorites:',
    //   movies.map((movie) => movie.tmdbId),
    // );

    // return movies.map((movie) => movie.tmdbId);
  }
}
