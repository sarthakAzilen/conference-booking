import { Controller, Post, Body } from '@nestjs/common';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  createBooking(@Body() bookingData: any) {
    return this.bookingsService.createBooking(bookingData);
  }
}
