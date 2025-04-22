import { Entity, Column, PrimaryColumn, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('booking')
export class Booking {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column()
  conferenceRoomId: string; // Updated from "room" to "conferenceRoomId"

  @Column({ nullable: true })
  duration: number;

  @Column({ nullable: true })
  project: string;

  @Column({ type: 'json', nullable: true })
  attendees: string[];

  @Column({ default: 'pending' })
  status: string;

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }
}
