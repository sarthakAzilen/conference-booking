import { Controller, Post, Body, Get } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from './bookings.entity';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  createBooking(@Body() bookingData: Booking) {
    return this.bookingsService.createBooking(bookingData);
  }

  @Get()
  getAllBookings() {
    return this.bookingsService.getAllBookings();
  }
}
