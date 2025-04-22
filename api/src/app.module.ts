import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { BookingsModule } from './bookings/bookings.module';
import { Booking } from './bookings/bookings.entity'; // Import the Booking entity
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { Register } from './register/register.entity'; // Import the Register entity
import { ConferenceRoomModule } from './conference-room/conference-room.module';
import { OfficeLocationModule } from './office-location/office-location.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(`${process.env.DB_PORT}`, 10) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'admin',
      database: process.env.DB_NAME || 'conference_booking',
      entities: [Booking, Register], // Explicitly specify entities
      synchronize: true, // Enable for development; disable in production
      migrationsRun: true, // Automatically run migrations
    }),
    BookingsModule,
    RegisterModule,
    LoginModule,
    ConferenceRoomModule,
    OfficeLocationModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
