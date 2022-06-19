import { IsArray, IsBoolean, IsEnum, IsInt, IsUUID } from 'class-validator';
import { DeckType } from '../enums';
import { CardDto } from './card.dto';

export class OpenDeckResponseDto {
  @IsUUID()
  readonly deckId: string;

  @IsEnum({ entity: DeckType })
  readonly type: DeckType;

  @IsBoolean()
  readonly shuffled: boolean;

  @IsInt()
  readonly remaining: number;

  @IsArray()
  readonly cards: CardDto[];
}
