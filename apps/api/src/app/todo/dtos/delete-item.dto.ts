import { IsNumber } from 'class-validator';

export class DeleteItemDto {
  @IsNumber()
  id: number;
}
