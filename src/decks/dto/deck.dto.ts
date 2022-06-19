import { IsBoolean, IsEnum, IsInt, IsUUID } from 'class-validator';
import { DeckType } from '../enums';

export class DeckDto {
  @IsUUID()
  readonly deckId: string;

  @IsEnum({ entity: DeckType })
  readonly type: DeckType;

  @IsBoolean()
  readonly shuffled: boolean;

  @IsInt()
  readonly remaining: number;
}
