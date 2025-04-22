import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConferenceRoom } from './conference-room.entity';
import { ConferenceRoomService } from './conference-room.service';
import { ConferenceRoomController } from './conference-room.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ConferenceRoom])],
  controllers: [ConferenceRoomController],
  providers: [ConferenceRoomService],
})
export class ConferenceRoomModule {}

export * from './dto/create-conference-room.dto';
