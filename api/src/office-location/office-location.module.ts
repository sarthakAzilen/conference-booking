import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { OfficeLocation } from './office-location.entity';
import { OfficeLocationService } from './office-location.service';
import { OfficeLocationController } from './office-location.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([OfficeLocation]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret', // Ensure this matches the .env JWT_SECRET
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  controllers: [OfficeLocationController],
  providers: [OfficeLocationService],
})
export class OfficeLocationModule {}

export * from './dto/create-office-location.dto'; // Export the DTO
