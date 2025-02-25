import { ApiProperty } from '@nestjs/swagger';
import { Hotel } from '../entities/hotel.entities';
export class HotelResponseDto {
  @ApiProperty()
  hotelcode: string;

  @ApiProperty()
  hotelname: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  postcode: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  numrooms: number;

  @ApiProperty()
  phoneno: string;

  @ApiProperty()
  starrating: number;

  @ApiProperty()
  image_url: string;

  constructor(hotel: Hotel) {
    this.hotelcode = hotel.hotelcode;
    this.hotelname = hotel.hotelname;
    this.address = hotel.address;
    this.postcode = hotel.postcode;
    this.city = hotel.city;
    this.country = hotel.country;
    this.numrooms = hotel.numrooms;
    this.phoneno = hotel.phoneno;
    this.starrating = hotel.starrating;
    this.image_url = hotel.image_url;
  }
}
