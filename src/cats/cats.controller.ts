// cats.controller.ts
import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../enum/role.enum';
import { RolesGuard } from '../roles/roles.guard';

@Controller('cats')
@UseGuards(RolesGuard) // Sử dụng RolesGuard cho toàn bộ controller
export class CatsController {
  // Endpoint tạo cat yêu cầu user có role Admin
  @Post()
  @Roles(Role.Admin)
  create(@Body() createCatDto: any) {
    return {
      message: 'Cat created!',
      cat: createCatDto,
    };
  }

  // Endpoint liệt kê cats không yêu cầu role cụ thể (truy cập được cho mọi user)
  @Get()
  findAll() {
    return [
      { name: 'Tom', age: 2 },
      { name: 'Garfield', age: 5 },
    ];
  }
}
