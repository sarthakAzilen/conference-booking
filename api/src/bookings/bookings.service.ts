import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './bookings.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingsRepository: Repository<Booking>,
  ) {}

  async createBooking(bookingData: CreateBookingDto) {
    const booking = this.bookingsRepository.create({
      ...bookingData,
      conferenceRoom: { id: bookingData.conferenceRoomId }, // Map to nested conferenceRoom object
      project: bookingData.projectId
        ? { id: bookingData.projectId }
        : undefined, // Map to nested project object
      attendees: bookingData.attendees || [], // Default to an empty array if not provided
      status: bookingData.status || 'pending', // Default to 'pending' if not provided
    });
    await this.bookingsRepository.save(booking);
    return { message: 'Booking created successfully', booking };
  }

  async getAllBookings(): Promise<Booking[]> {
    return this.bookingsRepository.find();
  }

  async updateBooking(id: string, updateData: Partial<CreateBookingDto>) {
    const booking = await this.bookingsRepository.findOneBy({ id });
    if (!booking) {
      throw new Error('Booking not found');
    }
    Object.assign(booking, updateData);
    await this.bookingsRepository.save(booking);
    return { message: 'Booking updated successfully', booking };
  }

  async deleteBooking(id: string) {
    const booking = await this.bookingsRepository.findOneBy({ id });
    if (!booking) {
      throw new Error('Booking not found');
    }
    await this.bookingsRepository.delete({ id });
    return { message: 'Booking deleted successfully' };
  }
}
