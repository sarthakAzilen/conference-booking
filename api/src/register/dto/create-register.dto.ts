import { ApiProperty } from '@nestjs/swagger';

export class CreateRegisterDto {
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: 'Male', enum: ['Male', 'Female', 'Other'] })
  gender: 'Male' | 'Female' | 'Other';

  @ApiProperty({ example: 'EMP12345' })
  employeeId: string;

  @ApiProperty({
    example: 'Employee',
    enum: ['Employee', 'HR Admin', 'Facility Admin', 'Super Admin'],
  })
  role: 'Employee' | 'HR Admin' | 'Facility Admin' | 'Super Admin';

  @ApiProperty({ example: 'password123' })
  password: string;
}
