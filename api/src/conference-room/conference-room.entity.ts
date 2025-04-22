import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('conference_room')
export class ConferenceRoom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  floor: string;

  @Column()
  location: string;

  @Column({ nullable: true })
  capacity: number;
}
