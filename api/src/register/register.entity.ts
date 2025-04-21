import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('register') // This is the user table
export class Register {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  gender: 'Male' | 'Female' | 'Other';

  @Column({ unique: true })
  employeeId: string;

  @Column()
  role: 'Employee' | 'HR Admin' | 'Facility Admin' | 'Super Admin';

  @Column()
  password: string;
}
