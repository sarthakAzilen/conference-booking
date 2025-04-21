import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Register } from './register.entity';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Register]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret', // Use environment variable for JWT secret
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
  exports: [RegisterService], // Export service for use in other modules
})
export class RegisterModule {}
