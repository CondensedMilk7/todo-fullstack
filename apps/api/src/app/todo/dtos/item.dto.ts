import { Expose, Transform } from 'class-transformer';

export class ItemDto {
  @Expose()
  id: number;
  @Expose()
  description: string;
  @Expose()
  done: boolean;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
