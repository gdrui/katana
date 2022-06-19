import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DeckType } from '../enums';
import { Card } from './card.entity';

@Entity()
export class Deck {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: DeckType.Full })
  type: DeckType;

  @Column({ default: false })
  shuffled: boolean;

  @OneToMany((type) => Card, (card) => card.deck)
  cards: Card[];
}
