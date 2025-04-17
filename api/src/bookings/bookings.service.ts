import { Injectable } from '@nestjs/common';

export interface Booking {
  // Export the interface
  name: string;
  date: string;
  time: string;
  room: string;
}

@Injectable()
export class BookingsService {
  private bookings: Booking[] = [];

  createBooking(bookingData: Booking) {
    this.bookings.push(bookingData);
    console.log({ bookings: this.bookings });
    return { message: 'Booking created successfully', booking: bookingData };
  }

  getAllBookings(): Booking[] {
    // Explicitly specify the return type
    return this.bookings;
  }
}
