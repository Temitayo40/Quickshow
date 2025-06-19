import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schema/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async create(@Body() body: Partial<User>) {
    return this.usersService.createUser(body);
  }

  @Post('find')
  async find(@Body() body: { email: string }) {
    const user = await this.usersService.findByEmail(body.email);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
