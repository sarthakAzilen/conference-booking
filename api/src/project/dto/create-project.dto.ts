import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ description: 'Name of the project', example: 'Project Alpha' })
  name: string;

  @ApiProperty({
    description: 'ID of the project manager',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  projectManagerId: string;
}
