import { ApiProperty } from '@nestjs/swagger';

export class CreateOfficeLocationDto {
  @ApiProperty({
    description: 'Name of the office location',
    example: 'New York Office',
  })
  name: string;

  @ApiProperty({
    description: 'Floor number of the office location',
    example: '5',
  })
  floor: string;
}
