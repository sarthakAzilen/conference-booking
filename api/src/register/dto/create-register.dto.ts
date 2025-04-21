import { ApiProperty } from '@nestjs/swagger';
import { Gender, Role } from '../register.entity';

export class CreateRegisterDto {
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: Gender.Male, enum: Gender })
  gender: Gender;

  @ApiProperty({ example: 'EMP12345' })
  employeeId: string;

  @ApiProperty({ example: Role.Employee, enum: Role })
  role: Role;

  @ApiProperty({ example: 'password123' })
  password: string;
}
