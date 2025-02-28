import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { doubleCsrf } from 'csrf-csrf';
import { Request, Response } from 'express';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  // Cấu hình doubleCsrf
  const { doubleCsrfProtection, generateToken } = doubleCsrf({
    getSecret: (req: Request) => req.cookies['csrfSecret'], // Hàm lấy secret từ cookie
    cookieName: 'csrfToken', // Tên cookie chứa token
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    },
    size: 64, // Kích thước của token
    ignoredMethods: ['GET', 'HEAD', 'OPTIONS'], // Các phương thức bỏ qua kiểm tra CSRF
  });

  // Sử dụng middleware bảo vệ CSRF
  app.use(doubleCsrfProtection);

  // Lấy instance Express từ NestJS
  const server = app.getHttpAdapter().getInstance();

  // Tạo route để lấy CSRF token với kiểu rõ ràng cho req và res
  server.get('/csrf-token', (req: Request, res: Response) => {
    const csrfToken = generateToken(req, res);
    res.json({ csrfToken });
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Hotel API')
    .setDescription('The Hotel API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 5000;
  await app.listen(port);
  logger.log(`🚀 Application is running on: http://localhost:${port}`);
  logger.log(`📚 Swagger documentation: http://localhost:${port}/api`);
}
bootstrap();
