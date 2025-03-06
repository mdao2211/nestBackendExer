import { Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Role } from '@/enum/role.enum';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Thông tin đăng nhập không hợp lệ');
  }

  async login(user: any, res: Response) {
    const roles = user.role === 1 ? [Role.Admin] : [Role.User];

    const payload = { email: user.email, sub: user.guestid, roles };
    const token = this.jwtService.sign(payload);
    //Setting cookie have JWT
    res.cookie('jwtToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    console.log(payload);
    console.log(roles);

    return {
      message: 'Đăng nhập thành công',
    };
  }
  async logout(res: Response) {
    res.clearCookie('jwtToken');
    return res.status(200).json({ message: 'Đăng xuất thành công' });
  }
}
