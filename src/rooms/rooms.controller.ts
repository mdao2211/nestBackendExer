import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoomResponseDto } from './dto/room-response.dto';
import { RoomsService } from './rooms.service';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get rooms by a hotel id' })
  @ApiResponse({
    status: 200,
    description: 'Return rooms by a hotel id.',
    type: RoomResponseDto,
    isArray: true,
  })
  @ApiResponse({ status: 404, description: 'Hotel not found.' })
  async findRoomsByHotelCode(
    @Param('id') id: string,
  ): Promise<RoomResponseDto[] | string> {
    return await this.roomsService.findRoomByHotelCode(id);
  }
}
