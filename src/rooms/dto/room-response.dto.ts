/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Rooms } from '../entities/room.entities';

export class RoomResponseDto {
  @ApiProperty()
  roomno: number;

  @ApiProperty()
  roomtype: number;

  @ApiProperty()
  hotelcode: string;

  @ApiProperty()
  occupancy: number;

  constructor(room: Rooms) {
    this.roomno = room.roomno;
    this.roomtype = room.roomtype;
    this.hotelcode = room.hotelcode;
    this.occupancy = room.occupancy;
  }
}
