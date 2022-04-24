import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { AuthService } from '../auth/auth.service';

// Add optional currentUser property to the global type Request provided by express.
// Prevents typescript from throwing an error when currentUser is asigned to request.
declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const userId = parseInt(req.headers['authorization']);

    if (userId) {
      req.userId = userId;
    }

    next();
  }
}
