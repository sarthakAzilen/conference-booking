import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OfficeLocation } from '../office-location/office-location.entity';

@Entity('conference_room')
export class ConferenceRoom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  floor: string;

  @Column({ nullable: true })
  capacity: number;

  @ManyToOne(() => OfficeLocation, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'officeLocationId' })
  officeLocation: OfficeLocation;

  @Column()
  officeLocationId: string; // Foreign key to OfficeLocation
}
