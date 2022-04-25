import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request } from 'express';

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
export class UserIdMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'].split('Bearer ')[1];
    const decodedToken = this.jwtService.decode(token);
    const userId = decodedToken['userId'];

    if (userId) {
      req.userId = userId;
    }

    next();
  }
}
