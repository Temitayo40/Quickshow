import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { BookingDocument } from 'src/bookings/schema/booking.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel('Booking') private bookingModel: Model<BookingDocument>,
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

  //   import { RpcException } from '@nestjs/microservices';
  // throw new RpcException('Password is required to create a user');
}
// async updateFavorite(userId: string, movieId: string) {
//   const user = await Clerkclient.user.getUser(userId);
//   if (!user.privateMetadata.favorites) {
//     user.privateMetadata.fovorites = [];
//   }
//   if (!user.privateMetadata.favorites.includes(movieId)) {
//     user.privateMetadata.fovorites.push(movieId);
//   } else {
//     user.privateMetadata.fovorites = user.privateMetadata.favorites.filter((item) => item !== movieId)
//   }

//   await clerkclient.users.updateUserMetaData(userId {privateMetadata: user.privateMetadata});
// }
// }
