import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('hotel')
export class Hotel {
  @ApiProperty()
  @PrimaryColumn()
  hotelcode: string;

  @ApiProperty()
  @Column()
  hotelname: string;

  @ApiProperty()
  @Column()
  address: string;

  @ApiProperty()
  @Column()
  postcode: string;

  @ApiProperty()
  @Column()
  city: string;

  @ApiProperty()
  @Column()
  country: string;

  @ApiProperty()
  @Column()
  numrooms: number;

  @ApiProperty()
  @Column()
  phoneno: string;

  @ApiProperty()
  @Column()
  starrating: number;

  @ApiProperty()
  @Column()
  image_url: string;
}
