import { ApiProperty } from '@nestjs/swagger';

export class CreateConferenceRoomDto {
  @ApiProperty({
    description:
      'ID of the office location where the conference room is located',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  officeLocationId: string;

  @ApiProperty({
    description: 'Floor number where the conference room is located',
    example: '5',
  })
  floor: string;

  @ApiProperty({ description: 'Capacity of the conference room', example: 10 })
  capacity: number;

  @ApiProperty({
    description: 'Name of the conference room',
    example: 'Room A',
  })
  name: string;
}
