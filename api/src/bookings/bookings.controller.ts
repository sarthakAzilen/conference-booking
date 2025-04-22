import { Controller, Post, Body, Get, Patch, Param } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Bookings') // Group this controller under "Bookings" in Swagger
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new booking' }) // Describe the endpoint
  @ApiBody({
    type: CreateBookingDto,
    description: 'Data to create a new booking, including projectId',
  }) // Specify the request body type, including attendees
  createBooking(@Body() bookingData: CreateBookingDto) {
    return this.bookingsService.createBooking(bookingData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all bookings' }) // Describe the endpoint
  getAllBookings() {
    return this.bookingsService.getAllBookings();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing booking' })
  @ApiBody({
    description: 'Data to update the booking',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Updated Name' },
        description: { type: 'string', example: 'Updated Description' },
        date: { type: 'string', format: 'date', example: '2023-10-02' },
        time: { type: 'string', format: 'time', example: '11:00' },
        conferenceRoomId: {
          type: 'string',
          example: '550e8400-e29b-41d4-a716-446655440000',
        },
        duration: { type: 'number', example: 90 },
        attendees: {
          type: 'array',
          items: { type: 'string' },
          example: ['attendee1@example.com', 'attendee2@example.com'],
        },
        status: { type: 'string', example: 'confirmed' },
      },
    },
  })
  updateBooking(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateBookingDto>,
  ) {
    return this.bookingsService.updateBooking(id, updateData);
  }
}
