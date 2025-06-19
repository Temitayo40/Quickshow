import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(data: Partial<User>) {
    if (!data.password) {
      throw new Error('Password is required to create a user');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = new this.userModel({
      ...data,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string) {
    return this.userModel.findById(id);
  }
}
