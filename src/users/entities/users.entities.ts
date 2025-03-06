import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('guest')
export class User {
  @PrimaryGeneratedColumn()
  guestid: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'int', default: 0 })
  role: number;
}
