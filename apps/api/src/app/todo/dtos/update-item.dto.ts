import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateItemDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  done: boolean;
}
