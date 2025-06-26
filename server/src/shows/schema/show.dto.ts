/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

class TimeSlot {
  @IsString()
  date: string;

  @IsArray()
  time: string[];
}

export class ShowBody {
  @IsString()
  movieId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeSlot)
  showsInput: TimeSlot[];

  @IsNumber()
  showPrice: number;
}
