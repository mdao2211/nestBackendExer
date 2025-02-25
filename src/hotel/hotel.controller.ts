import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PageOptionsDto } from '@/common/dto/page-options.dto';
import { ApiPaginatedResponse } from '@/common/decorators/api-paginated-response.decorator';
import { HotelResponseDto } from './dto/hotel-response.dto';

@ApiTags('hotels')
@Controller('hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Get()
  @ApiOperation({ summary: 'Get all hotels with pagination' })
  @ApiPaginatedResponse(HotelResponseDto)
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: PageOptionsDto,
  ): Promise<HotelResponseDto[]> {
    return await this.hotelService.findAll(pageOptionsDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a hotel by id' })
  @ApiResponse({
    status: 200,
    description: 'Return a hotel.',
    type: HotelResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Hotel not found.' })
  async findOne(@Param('id') id: string): Promise<HotelResponseDto> {
    return await this.hotelService.findOne(id);
  }
}
