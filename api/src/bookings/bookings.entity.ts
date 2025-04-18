import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column()
  room: string;

  @Column({ nullable: true }) // Make the duration column nullable
  duration: number;

  @Column({ type: 'json', nullable: true }) // Add attendees column as a JSON array
  attendees: string[];
}
