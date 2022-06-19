import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CardSuit } from '../enums';
import { Deck } from './deck.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: string;

  @Column()
  suit: CardSuit;

  @Column()
  code: string;

  @Column({ default: false })
  used: boolean;

  @Column()
  deckId: string;

  @ManyToOne((type) => Deck, { onDelete: 'CASCADE' })
  deck: Deck;
}
