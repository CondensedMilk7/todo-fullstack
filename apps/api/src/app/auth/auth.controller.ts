import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserId } from '../decorators/user-id.decorator';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { CurrentUserInterceptor } from '../interceptors/current-user.interceptor';
import { AuthService } from './auth.service';
import { SigninDto } from './dtos/signin.dto';
import { SignupDto } from './dtos/signup.dto';

@UseInterceptors(ClassSerializerInterceptor, CurrentUserInterceptor)
@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/whoami')
  @UseGuards(JwtAuthGuard)
  whoami(@UserId() userId: number) {
    return { message: `Your id is ${userId}` };
  }

  @Post('/signup')
  async signup(@Body() body: SignupDto) {
    const user = await this.authService.signup(body);
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: SigninDto) {
    return this.authService.signin(body);
  }
}
