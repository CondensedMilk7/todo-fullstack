import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService
  ) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const header = request.headers['authorization'];

    if (header) {
      const token = header.split('Bearer ')[1] || null;

      if (token) {
        const decodedToken = this.jwtService.decode(token);
        const userId = decodedToken['userId'];
        const user = await this.authService.findOne(userId);
        request.user = user;
      }
    }

    return handler.handle();
  }
}
