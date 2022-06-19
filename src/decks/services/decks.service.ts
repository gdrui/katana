import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectIdColumn, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CardDto } from '../dto/card.dto';
import { DeckDto } from '../dto/deck.dto';
import { CreateDeckDto } from '../dto/create-deck.dto';
import { OpenDeckResponseDto } from '../dto/open-deck-response.dto';
import { Card } from '../entities/card.entity';
import { Deck } from '../entities/deck.entity';
import { CardSuit, DeckType } from '../enums';

@Injectable()
export class DecksService {
  constructor(
    @InjectRepository(Deck) private deckRepository: Repository<Deck>,
    @InjectRepository(Card) private cardRepository: Repository<Card>,
  ) {}

  async create(createDeckDto: CreateDeckDto): Promise<DeckDto> {
    const { identifiers } = await this.deckRepository.insert(createDeckDto);
    const deckId = identifiers[0]['id'];

    await this.cardRepository
      .createQueryBuilder()
      .insert()
      .values(this.generateCards(createDeckDto, deckId))
      .execute();

    return await this.getDeckWithCount(deckId);
  }

  findAll(): Promise<Deck[]> {
    return this.deckRepository.find();
  }

  async findOne(id: string): Promise<OpenDeckResponseDto> {
    const deck = await this.getDeckWithCount(id);
    
    if (deck === undefined) {
      throw new NotFoundException();
    }

    return { ...deck, cards: await this.getUnusedCards(id) };
  }

  async drawCards(deckId: string, count: number): Promise<CardDto[]> {
    const result = await this.cardRepository.query(
      `
        UPDATE card SET used = true WHERE id IN (
          SELECT id FROM card
          WHERE used = false AND "deckId" = $1 LIMIT $2
          )
        RETURNING "value", suit, code;
      `,
      [deckId, count],
    );

    return result[0];
  }

  generateCards(
    createDeckDto: CreateDeckDto,
    deckId: string,
  ): QueryDeepPartialEntity<Card>[] {
    const values = [
      'A',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'J',
      'Q',
      'K',
    ];
    const cards = Object.keys(CardSuit).flatMap((suitKey) =>
      values
        .filter((v) => {
          if (
            createDeckDto.type === DeckType.Short &&
            values.indexOf(v) >= 2 &&
            values.indexOf(v) <= 6
          ) {
            return false;
          }
          return true;
        })
        .map((v): QueryDeepPartialEntity<Card> => {
          return {
            value: v,
            suit: CardSuit[suitKey],
            code: this.generateCardCode(v, CardSuit[suitKey]),
            deckId,
          };
        }),
    );
    if (createDeckDto.shuffled) {
      cards.sort((a, b) => {
        return Math.random() - 0.5;
      });
    }
    return cards;
  }

  generateCardCode(value: string, suit: CardSuit): string {
    return value === '10'
      ? `10${suit.substring(0, 1)}`
      : `${value.substring(0, 1)}${suit.substring(0, 1)}`;
  }

  async getDeckWithCount(id: string): Promise<DeckDto> {
    const result = await this.deckRepository
      .createQueryBuilder()
      .select('Deck.id', 'deckId')
      .addSelect(['type', 'shuffled'])
      .leftJoin('Deck.cards', 'cards')
      .addSelect('COUNT(cards) filter (where used = false)', 'remaining')
      .groupBy('Deck.id')
      .where({ id })
      .execute();

    return result[0];
  }

  async getUnusedCards(id: string): Promise<CardDto[]> {
    return this.cardRepository
      .createQueryBuilder()
      .select(['"value"', 'suit', 'code'])
      .where({ deckId: id, used: false })
      .execute();
  }
}
