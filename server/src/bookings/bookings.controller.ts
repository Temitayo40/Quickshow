import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { CurrentUser } from 'src/common/decorators/current-user-decorator';
import { Request } from 'express';

@Controller('api/booking')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createBooking(
    @Req() request: Request,
    @CurrentUser() user: { sub: string },
    @Body() body: { showId: string; selectedSeats: string[] },
  ) {
    const origin = request.get('origin') || 'http://localhost:3000';
    const { sub } = user;
    const { showId, selectedSeats } = body;

    const isAvailable = await this.bookingsService.checkSeatsAvailability(
      showId,
      selectedSeats,
    );

    if (!isAvailable) {
      return {
        success: false,
        message: 'Selected seats are not available',
      };
    }

    const session = await this.bookingsService.createBooking(
      showId,
      selectedSeats,
      sub,
      origin,
    );

    return {
      success: true,
      url: session.url,
    };
  }

  @Get('/seats/:showId')
  async getOccupiedSeats(@Param('showId') showId: string) {
    try {
      const occupiedSeats = await this.bookingsService.getOccupiedSeats(showId);
      return {
        success: true,
        occupiedSeats,
      };
    } catch (error) {
      console.log(error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
