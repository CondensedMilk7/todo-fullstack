import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { Repository } from 'typeorm';
import { promisify } from 'util';
import { SignupDto } from './dtos/signup.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { environment } from '../../environments/environment';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwtService: JwtService
  ) {}

  async signup({ username, email, password }: SignupDto) {
    // Check if email is in use
    const users = await this.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }
    // Generate a salt
    const salt = randomBytes(environment.randomBytesSize).toString('hex');

    // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Join the hashed result and the salt together
    const result = salt + environment.saltDivider + hash.toString('hex');

    // Create a new user and save it
    const user = this.repo.create({ username, email, password: result });

    // Save the user
    await this.repo.save(user);

    // Return access token
    const jwt = this.jwtService.sign({
      userId: user.id,
      username: user.username,
    });

    return { access_token: jwt };
  }

  async signin({ email, password }) {
    const [user] = await this.find(email);
    if (!user) {
      throw new BadRequestException('wrong credentials');
    }
    const [salt, storedHash] = user.password.split(environment.saltDivider);

    // Rehash provided password with stored salt
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Compare stored hash to rehashed
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('wrong credentials');
    }

    // Sign access token
    const jwt = await this.jwtService.signAsync({
      userId: user.id,
      username: user.username,
    });

    return { access_token: jwt };
  }

  find(email: string) {
    return this.repo.find({ email });
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }
}
