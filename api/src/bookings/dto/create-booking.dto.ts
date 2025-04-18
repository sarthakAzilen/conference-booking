import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({ description: 'Name of the person booking the room' })
  name: string;

  @ApiProperty({ description: 'Description of the booking' })
  description: string;

  @ApiProperty({ description: 'Date of the booking in YYYY-MM-DD format' })
  date: string;

  @ApiProperty({ description: 'Time of the booking in HH:MM format' })
  time: string;

  @ApiProperty({ description: 'Duration of the booking in minutes' })
  duration: number;

  @ApiProperty({ description: 'Room being booked' })
  room: string;

  @ApiProperty({
    description: 'List of attendees for the booking',
    type: [String],
    required: false,
  })
  attendees?: string[];
}
