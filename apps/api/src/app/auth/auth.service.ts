import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupDto } from './dtos/signup.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  signup(signupDto: SignupDto) {
    const user = signupDto;
    this.repo.create(user);
    return this.repo.save(user);
  }
}
