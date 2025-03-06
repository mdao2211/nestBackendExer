// auth.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Giả lập xác thực: gắn thông tin user vào request.
    // Bạn có thể thay đổi roles để thử nghiệm (ví dụ: ['user'] hay ['user', 'admin']).
    req.user = {
      id: 1,
      username: 'john',
      roles: ['user', 'admin'], // Thử đổi thành ['user', 'admin'] để cho phép truy cập endpoint yêu cầu Admin
    };
    next();
  }
}
