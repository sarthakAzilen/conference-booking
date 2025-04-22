import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('office_location')
export class OfficeLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  floor: string;
}
