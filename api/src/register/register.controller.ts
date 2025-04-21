import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Import the guard
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'; // Replace ApiHeader with ApiBearerAuth
import { Request } from 'express'; // Import Request type from Express

@ApiTags('Register')
@ApiBearerAuth() // Use ApiBearerAuth to indicate Bearer token usage
@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // Apply the guard
  async create(
    @Body() createRegisterDto: CreateRegisterDto,
    @Req() req: Request & { user: { role: string } }, // Update type to include headers
  ) {
    const userRole = req.user.role; // Extract user role from the JWT payload

    const result = await this.registerService.create(
      createRegisterDto,
      userRole,
    );
    return {
      ...result,
      token: req.headers.authorization?.split(' ')[1], // Include the token in the response
    };
  }
}
