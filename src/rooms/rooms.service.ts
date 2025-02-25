import { Injectable, NotFoundException } from '@nestjs/common';
import { Rooms } from './entities/room.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomResponseDto } from './dto/room-response.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Rooms)
    private roomRepository: Repository<Rooms>,
  ) {}

  async findRoomByHotelCode(
    hotelcode: number,
  ): Promise<RoomResponseDto[] | string> {
    const rooms = await this.roomRepository.find({
      where: { hotelcode },
    });

    if (!rooms || rooms.length === 0) {
      return 'no rooms found';
    }

    return rooms.map((room) => new RoomResponseDto(room));
  }
}
