import { Request } from 'express';

export interface RequestWithCsrf extends Request {
  csrfToken: () => string;
}
