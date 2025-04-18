import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Booking } from './src/bookings/bookings.entity'; // Import your entities

dotenv.config(); // Load environment variables

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(`${process.env.DB_PORT}`, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'conference_booking',
  entities: [Booking], // Add all your entities here
  migrations: ['./src/migrations/*.ts'], // Path to migrations
  synchronize: false, // Disable in production
});
