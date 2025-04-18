import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('booking') // Ensure the table name matches the database
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

  @Column({ nullable: true })
  duration: number;

  @Column({ nullable: true })
  project: string;

  @Column({ type: 'json', nullable: true })
  attendees: string[];

  @Column({ default: 'pending' })
  status: string;
}
