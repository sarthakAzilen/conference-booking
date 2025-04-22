import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ConferenceRoomService } from './conference-room.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { ConferenceRoom } from './conference-room.entity';
import { CreateConferenceRoomDto } from './dto/create-conference-room.dto';

@ApiTags('Conference Rooms')
@Controller('conference-rooms')
export class ConferenceRoomController {
  constructor(private readonly conferenceRoomService: ConferenceRoomService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new conference room' })
  @ApiBody({ type: CreateConferenceRoomDto }) // Specify the request body type
  create(@Body() data: CreateConferenceRoomDto) {
    return this.conferenceRoomService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all conference rooms' })
  findAll() {
    return this.conferenceRoomService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a conference room' })
  update(@Param('id') id: string, @Body() data: Partial<ConferenceRoom>) {
    return this.conferenceRoomService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a conference room' })
  delete(@Param('id') id: string) {
    return this.conferenceRoomService.delete(id);
  }
}
