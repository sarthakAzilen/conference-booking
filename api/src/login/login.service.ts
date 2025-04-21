import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterService } from '../register/register.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    private readonly registerService: RegisterService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.registerService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (!user.password) {
      throw new UnauthorizedException('Password not set for this user');
    }
    if (typeof loginDto.password !== 'string') {
      throw new UnauthorizedException('Invalid password format');
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.jwtService.sign({ id: user.id, role: user.role });
    return { message: 'Login successful', token };
  }
}
