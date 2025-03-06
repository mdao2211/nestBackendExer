// roles.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enum/role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Lấy danh sách các role cần thiết từ metadata của handler và controller
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Nếu không định nghĩa role nào thì cho phép truy cập
    if (!requiredRoles) {
      return true;
    }
    // Lấy đối tượng request (ở HTTP context) và user gắn vào đó
    const { user } = context.switchToHttp().getRequest();

    // Kiểm tra xem user có chứa ít nhất 1 role cần thiết không
    const hasRole = requiredRoles.some((role) => user.roles?.includes(role));
    if (!hasRole) {
      throw new ForbiddenException('Sorry, this is page for admin, try again');
    }
    return hasRole;
  }
}
