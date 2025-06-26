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
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MovieDocument } from 'src/movies/schema/movie.schema';

@Controller('/api/show')
export class ShowsController {
  constructor(
    private readonly showsService: ShowsService,
    @InjectModel('Movie')
    private movieModel: Model<MovieDocument>,
  ) {}

  @Get()
  getHello(): string {
    return 'Hello World here!';
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.ADMIN)
  @Post('/add')
  async addShow(@Body() body: ShowBody) {
    const { movieId, showsInput, showPrice } = body;
    try {
      await this.showsService.addShow(movieId, showsInput, showPrice);
      return {
        success: true,
        message: 'Show Added Successfully',
      };
    } catch (error: unknown) {
      throw new HttpException(
        { success: false, message: (error as Error).message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/now-playing')
  async getNowPlayingMovies() {
    try {
      const movies = await this.showsService.getNowPlayingMovies();
      return {
        success: true,
        movies,
      };
    } catch (error: unknown) {
      throw new HttpException(
        { success: false, message: (error as Error).message },
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
    } catch (error: unknown) {
      throw new HttpException(
        { success: false, message: (error as Error).message },
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
    } catch (error: unknown) {
      throw new HttpException(
        { success: false, message: (error as Error).message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
