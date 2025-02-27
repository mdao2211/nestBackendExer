import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthenticatedRequest } from './interface/authenticated-request.interface';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response as ExpressResponse } from 'express';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập và nhận JWT' })
  @ApiResponse({
    status: 200,
    description: 'Trả về token JWT nếu đăng nhập thành công',
  })
  async login(@Body() loginDto: LoginDto, @Response() res: ExpressResponse) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    const result = await this.authService.login(user, res);
    return res.status(200).json(result);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy thông tin của người dùng đã đăng nhập' })
  @ApiResponse({ status: 200, description: 'Thông tin người dùng' })
  getProfile(@Request() req: AuthenticatedRequest) {
    return req.user;
  }

  @Post('logout')
  @ApiOperation({ summary: 'Đăng xuất và xóa JWT Cookie' })
  @ApiResponse({ status: 200, description: 'JWT Cookie bị xóa' })
  async logout(@Response() res: ExpressResponse) {
    res.clearCookie('jwtToken');
    return res.status(200).json({ message: 'Đăng xuất thành công' });
  }
}
