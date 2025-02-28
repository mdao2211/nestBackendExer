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
import { RequestWithCsrf } from './interface/authenticated-request-csrf';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('csrf-token')
  @ApiOperation({ summary: 'Lấy CSRF token' })
  getCsrfToken(@Request() req: RequestWithCsrf): { csrfToken: string } {
    // Chỉ gọi req.csrfToken() một lần và trả về giá trị token
    const token = req.csrfToken();
    return { csrfToken: token };
  }

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
    res.clearCookie('jwtToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/', // Đảm bảo path khớp với khi cookie được set
    });
    return res.status(200).json({ message: 'Đăng xuất thành công' });
  }
}
