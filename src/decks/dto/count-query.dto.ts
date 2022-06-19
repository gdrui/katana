import { Type } from 'class-transformer';
import { IsNumber, IsNumberString, IsOptional, Max, Min } from 'class-validator';

export class CountQueryDto {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(52)
  @IsOptional()
  readonly count?: number = 1;
}
