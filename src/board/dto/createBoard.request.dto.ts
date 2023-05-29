import { IsNotEmpty, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardRequestDto {
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @Length(1, 15)
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @Length(1, 1000)
  @ApiProperty()
  description: string;
}
