/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('room')
export class Rooms {
  // @ApiProperty()
  @PrimaryColumn()
  roomno: number;

  // @ApiProperty()
  @Column()
  roomtype: number;

  // @ApiProperty()
  @Column()
  hotelcode: string;

  // @ApiProperty()
  @Column()
  occupancy: number;
}
