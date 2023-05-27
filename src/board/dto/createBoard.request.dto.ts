import { IsNotEmpty, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateBoardRequestDto {
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @Length(1, 15)
  title: string;

  @IsNotEmpty()
  @Length(1, 1000)
  description: string;
}
