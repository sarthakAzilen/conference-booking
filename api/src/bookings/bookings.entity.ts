import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ConferenceRoom } from '../conference-room/conference-room.entity';
import { Project } from '../project/project.entity';

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

  @ManyToOne(() => ConferenceRoom, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'conferenceRoomId' }) // Foreign key column
  conferenceRoom: ConferenceRoom;

  @Column()
  conferenceRoomId: string; // Foreign key to ConferenceRoom

  @Column({ nullable: true })
  duration: number;

  @ManyToOne(() => Project, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'project' }) // Foreign key column
  project: Project;

  @Column({ nullable: true })
  projectId: string; // Foreign key to Project

  @Column({ type: 'json', nullable: true })
  attendees: string[];

  @Column({ default: 'pending' })
  status: string;

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }
}
