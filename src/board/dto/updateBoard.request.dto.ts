import { IsOptional, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateBoardRequestDto {
  @Transform(({ value }) => value.trim())
  @IsOptional()
  @Length(1, 15)
  title?: string;

  @IsOptional()
  @Length(1, 1000)
  description?: string;
}
