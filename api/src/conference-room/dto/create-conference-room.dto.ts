import { ApiProperty } from '@nestjs/swagger';

export class CreateConferenceRoomDto {
  @ApiProperty({
    description: 'Office location of the conference room',
    example: 'New York Office',
  })
  officeLocation: string;

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
