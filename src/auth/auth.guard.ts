import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['jwtToken']; // ⚠️ Đọc từ cookie
    if (!token) {
      throw new UnauthorizedException('Unauthorized: No token provided');
    }
    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded; // Gán user vào request
      return true;
    } catch (err) {
      throw new UnauthorizedException('Unauthorized: Invalid token');
    }
  }
}
