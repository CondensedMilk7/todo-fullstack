import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ItemDto {
  id: number;
  description: string;
  done: boolean;
}
