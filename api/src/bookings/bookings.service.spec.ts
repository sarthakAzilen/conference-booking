import { Test, TestingModule } from '@nestjs/testing';
import { BookingsService } from './bookings.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Booking } from './bookings.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

describe('BookingsService', () => {
  let service: BookingsService;

  const mockBooking: CreateBookingDto = {
    name: 'John Doe',
    description: 'Team Meeting',
    date: '2023-10-01',
    time: '10:00',
    room: 'Room A',
    status: 'pending',
    duration: 120,
    attendees: [],
  };

  const mockRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockResolvedValue({ id: 1, ...mockBooking }),
    find: jest.fn().mockResolvedValue([mockBooking]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        {
          provide: getRepositoryToken(Booking),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
  });

  it('should create a booking', async () => {
    const result = await service.createBooking(mockBooking);

    expect(result).toEqual({
      message: 'Booking created successfully',
      booking: { ...mockBooking },
    });
    expect(mockRepository.save).toHaveBeenCalled();
  });

  it('should return all bookings', async () => {
    const result = await service.getAllBookings();
    expect(result).toEqual([mockBooking]);
    expect(mockRepository.find).toHaveBeenCalled();
  });
});
