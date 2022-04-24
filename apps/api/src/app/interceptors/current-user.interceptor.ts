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
    private authService: AuthService,
    private jwtService: JwtService
  ) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'].split('Bearer ')[1];
    const decodedToken = this.jwtService.decode(token);
    const userId = decodedToken['userId'];
    console.log(userId);
    if (userId) {
      request.currentUserId = userId;
    }

    return handler.handle();
  }
}
