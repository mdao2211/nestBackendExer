import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from './entities/hotel.entities';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { PageOptionsDto } from '@/common/dto/page-options.dto';
import { PageMetaDto } from '@/common/dto/page-meta.dto';
import { HotelResponseDto } from './dto/hotel-response.dto';

export interface PageDto<T> {
  items: T[];
  meta: PageMetaDto;
}

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<HotelResponseDto[]> {
    const queryBuilder = this.hotelRepository.createQueryBuilder('hotel');

    queryBuilder
      .orderBy('hotel.hotelname', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.limit);

    // Lấy danh sách khách sạn mà không cần meta
    const hotels = await queryBuilder.getMany();

    // Trả về mảng các DTO
    return hotels.map((hotel) => new HotelResponseDto(hotel));
  }
  async findOne(hotelcode: string): Promise<HotelResponseDto> {
    const hotel = await this.hotelRepository.findOne({ where: { hotelcode } });

    if (!hotel) {
      throw new NotFoundException(`Hotel with code ${hotelcode} not found`);
    }

    return new HotelResponseDto(hotel);
  }

  async create(createHotelDto: CreateHotelDto): Promise<HotelResponseDto> {
    const hotel = this.hotelRepository.create(createHotelDto);
    const savedHotel = await this.hotelRepository.save(hotel);
    return new HotelResponseDto(savedHotel);
  }
}
