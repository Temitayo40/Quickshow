import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { UserRole } from 'src/users/schema/user.schema';
import { RpcException } from '@nestjs/microservices';
// import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
    const user = await this.usersService.findByEmail(email, true);
    const isPasswordValid =
      user && (await bcrypt.compare(password, user.password));
    if (isPasswordValid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  login(user: {
    email: string;
    _id: Types.ObjectId;
    role: string;
    name: string;
    imageUrl?: string;
    password?: string;
    googleId?: string;
  }) {
    const payload = {
      email: user.email,
      sub: user._id,
      role: user.role,
      name: user.name,
      imageUrl: user.imageUrl || null,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, googleId, ...publicUser } = user;

    // const { password, googleId, ...publicUser } = user.toObject();

    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      user: publicUser,
    };
  }

  async loginOrRegisterGoogleUser(googleUser: {
    email: string;
    name: string;
    googleId: string;
    role?: UserRole;
    imageUrl?: string;
  }) {
    const existing = await this.usersService.findByEmail(googleUser.email);

    let user = existing;
    if (!user) {
      user = await this.usersService.createUser({
        email: googleUser.email,
        name: googleUser.name,
        googleId: googleUser.googleId,
        role: googleUser.role || UserRole.VIEWER,
        imageUrl: googleUser.imageUrl,
      });
    }

    return this.login(user);
  }

  async register(userData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    imageUrl?: string;
  }) {
    const { name, email, password, confirmPassword } = userData;

    if (password !== confirmPassword) {
      throw new RpcException('Passwords do not match');
    }

    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new RpcException('User with this email already exists');
    }

    const user = await this.usersService.createUser({
      name,
      email,
      password,
      role: UserRole.VIEWER,
      imageUrl: userData.imageUrl,
    });

    return this.login(user);
  }
}
