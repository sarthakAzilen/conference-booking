import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export enum Role {
  Employee = 'Employee',
  HRAdmin = 'HR Admin',
  FacilityAdmin = 'Facility Admin',
  SuperAdmin = 'Super Admin',
}

@Entity('register') // This is the user table
export class Register {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: Gender, nullable: true }) // Allow null values
  gender: Gender | null;

  @Column({ unique: true })
  employeeId: string;

  @Column({ type: 'enum', enum: Role, nullable: true }) // Allow null values
  role: Role | null;

  @Column()
  password: string;
}
