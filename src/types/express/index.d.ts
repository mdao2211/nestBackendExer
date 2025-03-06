// src/types/express/index.d.ts
import { Role } from '../../role.enum'; // điều chỉnh đường dẫn cho đúng

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        username: string;
        roles: Role[];
      };
    }
  }
}
