import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Register } from './register.entity';
import { CreateRegisterDto } from './dto/create-register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Register)
    private readonly registerRepository: Repository<Register>,
  ) {}

  async create(createRegisterDto: CreateRegisterDto, userRole: string) {
    if (userRole !== 'HR Admin') {
      throw new ForbiddenException('Only HR Admins can register users.');
    }
    const hashedPassword = await bcrypt.hash(createRegisterDto.password, 10); // Encrypt the password
    const register = this.registerRepository.create({
      ...createRegisterDto,
      password: hashedPassword, // Store the hashed password
    });
    await this.registerRepository.save(register);
    return { message: 'User registered successfully', register };
  }

  async findByEmail(email: string): Promise<Register | undefined | null> {
    return this.registerRepository.findOneBy({ email });
  }
}
