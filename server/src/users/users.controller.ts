import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './schema/user.dto';
import { RpcException } from '@nestjs/microservices';
import { AuthRequest } from 'src/common/authRequest';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  async create(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @Post('/find')
  async find(@Body() body: { email: string }) {
    const user = await this.usersService.findByEmail(body.email);
    if (!user) {
      throw new RpcException('User not found');
    }
    return user;
  }

  @Get('/bookings')
  async getUserBookings(@Req() req: AuthRequest) {
    try {
      const user = req.auth().userId;
      const bookings = await this.usersService.getUserBookings(user);
      return {
        success: true,
        bookings,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
// @Post()
// async addFavorite(@Body() body: { movieId: string }, @Req() req: Request) {
//   try {
//     const { movieId } = body;
//     const userId = req.auth().userId;

//     await this.usersService.updateFavorite(userId, movieId);
//     return {
//       success: true,
//       message: 'Favorite added succcessfully',
//     };
//   } catch (error) {
//     return {
//       success: true,
//       message: error.message,
//     };
//   }
// }
// }
