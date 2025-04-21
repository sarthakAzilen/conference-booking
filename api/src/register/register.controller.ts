import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Import the guard
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Register')
@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // Apply the guard
  async create(
    @Body() createRegisterDto: CreateRegisterDto,
    @Req() req: { user: { role: string } },
  ) {
    const userRole = req.user.role; // Extract user role from the JWT payload
    return this.registerService.create(createRegisterDto, userRole);
  }
}
