import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './bookings.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingsRepository: Repository<Booking>,
  ) {}

  async createBooking(bookingData: Booking) {
    const booking = this.bookingsRepository.create(bookingData);
    await this.bookingsRepository.save(booking);
    return { message: 'Booking created successfully', booking };
  }

  async getAllBookings(): Promise<Booking[]> {
    return this.bookingsRepository.find();
  }
}
