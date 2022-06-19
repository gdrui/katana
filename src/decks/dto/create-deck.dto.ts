import { DeckType } from '../enums';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

export class CreateDeckDto {
  @IsEnum(DeckType)
  @IsOptional()
  readonly type?: DeckType = DeckType.Full;

  @IsBoolean()
  @IsOptional()
  readonly shuffled?: boolean = false;
}
