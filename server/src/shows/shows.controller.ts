import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/role.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/role.enum';
import { ShowsService } from './shows.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { ShowBody } from './schema/show.dto';

@Controller('shows')
export class ShowsController {
  constructor(private readonly showsService: ShowsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('/add')
  async addShow(@Body() body: ShowBody) {
    const { movieId, showsInput, showPrice } = body;
    try {
      await this.showsService.addShow(movieId, showsInput, showPrice);
      return {
        success: true,
        message: 'Show Added Successfully',
      };
    } catch (error) {
      throw new HttpException(
        { success: false, message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get('now-playing')
  async getNowPlayingMovies() {
    try {
      const movies = await this.showsService.getNowPlayingMovies();
      return {
        success: true,
        movies,
      };
    } catch (error) {
      throw new HttpException(
        { success: false, message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/all')
  async getShows() {
    try {
      const uniqueshow = await this.showsService.getShows();
      return {
        success: true,
        shows: Array.from(uniqueshow),
      };
    } catch (error) {
      throw new HttpException(
        { success: false, message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':movieId')
  async getShow(@Param('movieId') movieId: string) {
    try {
      const { movie, dateTime } = await this.showsService.getShow(movieId);

      return {
        success: true,
        movie,
        dateTime,
      };
    } catch (error) {
      throw new HttpException(
        { success: false, message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
