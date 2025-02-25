import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsUrl, Min, Max } from 'class-validator';

export class CreateHotelDto {
  @ApiProperty()
  @IsString()
  hotelcode: string;

  @ApiProperty()
  @IsString()
  hotelname: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  postcode: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  numrooms: number;

  @ApiProperty()
  @IsString()
  phoneno: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(5)
  starrating: number;

  @ApiProperty()
  @IsUrl()
  image_url: string;
}
