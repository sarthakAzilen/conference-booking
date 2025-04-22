import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConferenceRoom } from './conference-room.entity';

@Injectable()
export class ConferenceRoomService {
  constructor(
    @InjectRepository(ConferenceRoom)
    private readonly conferenceRoomRepository: Repository<ConferenceRoom>,
  ) {}

  create(data: Partial<ConferenceRoom>) {
    const room = this.conferenceRoomRepository.create(data);
    return this.conferenceRoomRepository.save(room);
  }

  findAll() {
    return this.conferenceRoomRepository.find();
  }

  update(id: string, data: Partial<ConferenceRoom>) {
    return this.conferenceRoomRepository.update(id, data);
  }

  delete(id: string) {
    return this.conferenceRoomRepository.delete(id);
  }
}
