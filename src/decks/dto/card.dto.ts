import { IsEnum, IsString } from 'class-validator';
import { CardSuit } from '../enums';

export class CardDto {
  @IsString()
  readonly value: string;

  @IsEnum({ entity: CardSuit })
  readonly suit: CardSuit;

  @IsString()
  readonly code: string;
}
