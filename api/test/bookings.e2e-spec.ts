import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('BookingsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/bookings (POST)', () => {
    return request(app.getHttpServer())
      .post('/bookings')
      .send({
        name: 'John Doe',
        description: 'Team Meeting',
        date: '2023-10-01',
        time: '10:00',
        conferenceRoomId: '550e8400-e29b-41d4-a716-446655440000', // Updated from "room"
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty(
          'message',
          'Booking created successfully',
        );
        expect(res.body.booking).toHaveProperty('id');
      });
  });

  it('/bookings (GET)', () => {
    return request(app.getHttpServer())
      .get('/bookings')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  it('/bookings/:id (PATCH)', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/bookings')
      .send({
        name: 'John Doe',
        description: 'Team Meeting',
        date: '2023-10-01',
        time: '10:00',
        conferenceRoomId: '550e8400-e29b-41d4-a716-446655440000', // Updated from "room"
      })
      .expect(201);

    const bookingId = createResponse.body.booking.id;

    return request(app.getHttpServer())
      .patch(`/bookings/${bookingId}`)
      .send({ description: 'Updated Meeting' })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty(
          'message',
          'Booking updated successfully',
        );
        expect(res.body.booking).toHaveProperty(
          'description',
          'Updated Meeting',
        );
      });
  });
});
