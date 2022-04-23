import { Exclude } from 'class-transformer';

export class UserDto {
  id: number;

  username: string;

  email: string;

  password: string;
}
