import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { CurrentUser } from 'src/common/decorators/current-user-decorator';
import { CreateUserDto } from './schema/user.dto';
import { UsersService } from './users.service';

@Controller('api/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  async create(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @Post('/find')
  async findUserByEmail(@Body('email') email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      imageUrl: user.imageUrl || null,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/bookings')
  async getUserBookings(@CurrentUser() user: { sub: string }) {
    try {
      const { sub } = user;
      const bookings = await this.usersService.getUserBookings(sub);
      return {
        success: true,
        bookings,
      };
    } catch (error: unknown) {
      return {
        success: false,
        message: (error as Error).message,
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/favorites')
  async getUserFavorites(@CurrentUser() user: { sub: string }) {
    try {
      const { sub } = user;
      const userDoc = await this.usersService.getUserFavorites(sub);
      return {
        success: true,
        favorites: userDoc,
      };
    } catch (error: unknown) {
      return {
        success: false,
        message: (error as Error).message,
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update-favorite')
  async updateFavorite(
    @Body() body: { movieId: string },
    @CurrentUser() user: { sub: string },
  ) {
    try {
      const { movieId } = body;
      const { sub } = user;

      const updatedUser = await this.usersService.updateFavorite(sub, movieId);

      const isNowFavorite = updatedUser.favorites.includes(movieId);

      return {
        success: true,
        message: isNowFavorite
          ? 'Favorite added successfully'
          : 'Favorite removed successfully',
        favorites: updatedUser.favorites,
      };
    } catch (error: unknown) {
      return {
        success: false,
        message: (error as Error).message,
      };
    }
  }
}
