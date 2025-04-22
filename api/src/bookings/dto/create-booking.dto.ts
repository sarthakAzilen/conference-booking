import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({
    description: 'Unique identifier for the booking',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

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

  @ApiProperty({ description: 'Conference Room ID being booked' })
  conferenceRoomId: string;

  @ApiProperty({
    description: 'List of attendees for the booking',
    type: [String],
    required: false,
  })
  attendees?: string[];

  @ApiProperty({
    description: `Project associated with the booking`,
    required: false,
  })
  project?: string;

  @ApiProperty({
    description: `Project ID associated with the booking`,
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: false,
  })
  projectId?: string;

  @ApiProperty({ description: 'Status of the booking', default: 'pending' })
  status: string;
}
