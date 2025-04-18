import { Controller, Post, Body, Get } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Bookings') // Group this controller under "Bookings" in Swagger
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new booking' }) // Describe the endpoint
  @ApiBody({ type: CreateBookingDto }) // Specify the request body type, including attendees
  createBooking(@Body() bookingData: CreateBookingDto) {
    return this.bookingsService.createBooking(bookingData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all bookings' }) // Describe the endpoint
  getAllBookings() {
    return this.bookingsService.getAllBookings();
  }
}
