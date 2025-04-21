import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { RegisterModule } from '../register/register.module';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Import the guard

@Module({
  imports: [
    RegisterModule, // Import RegisterModule for user-related operations
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret', // Use environment variable for JWT secret
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, JwtAuthGuard], // Provide the guard
})
export class LoginModule {}
