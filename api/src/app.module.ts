import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { BookingsModule } from './bookings/bookings.module';
import { Booking } from './bookings/bookings.entity';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { Register } from './register/register.entity';
import { ConferenceRoomModule } from './conference-room/conference-room.module';
import { ConferenceRoom } from './conference-room/conference-room.entity'; // Import the ConferenceRoom entity
import { OfficeLocationModule } from './office-location/office-location.module';
import { OfficeLocation } from './office-location/office-location.entity';
import { ProjectModule } from './project/project.module';
import { Project } from './project/project.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(`${process.env.DB_PORT}`, 10) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'admin',
      database: process.env.DB_NAME || 'conference_booking',
      entities: [Booking, Register, OfficeLocation, Project, ConferenceRoom], // Add ConferenceRoom entity here
      synchronize: true, // Enable for development; disable in production
      migrationsRun: true, // Automatically run migrations
    }),
    BookingsModule,
    RegisterModule,
    LoginModule,
    ConferenceRoomModule,
    OfficeLocationModule,
    ProjectModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
