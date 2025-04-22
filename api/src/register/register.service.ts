import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Register, Role } from './register.entity';
import { CreateRegisterDto } from './dto/create-register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Register)
    private readonly registerRepository: Repository<Register>,
    private readonly jwtService: JwtService, // Inject JwtService
  ) {}

  async create(createRegisterDto: CreateRegisterDto, userRole: Role) {
    if (userRole !== Role.HRAdmin && userRole !== Role.ProjectManager) {
      throw new ForbiddenException(
        'Only HR Admins or Project Managers can register users.',
      );
    }
    const hashedPassword = await bcrypt.hash(createRegisterDto.password, 10); // Encrypt the password
    const register = this.registerRepository.create({
      ...createRegisterDto,
      password: hashedPassword, // Store the hashed password
    });

    try {
      await this.registerRepository.save(register);
    } catch (error) {
      const errorRes = error as { code: string };
      if (errorRes.code === '23505') {
        // PostgreSQL unique violation error code
        throw new ForbiddenException('Employee ID must be unique.');
      }
      throw error; // Re-throw other errors
    }

    // Generate JWT token
    const token = this.jwtService.sign({
      id: register.id,
      role: register.role,
    });

    return { message: 'User registered successfully', register, token };
  }

  async findByEmail(email: string): Promise<Register | undefined | null> {
    return this.registerRepository.findOneBy({ email });
  }
}
