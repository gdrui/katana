import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from '../entities/card.entity';
import { Deck } from '../entities/deck.entity';
import { CardSuit, DeckType } from '../enums';
import { DecksService } from './decks.service';

// @ts-ignore
export const repositoryMockFactory: () => jest.Mock<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
  }),
);

describe('DecksService', () => {
  let service: DecksService;
  let mockDeckRepository: jest.Mock<Repository<Deck>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DecksService,
        {
          provide: getRepositoryToken(Deck),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Card),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<DecksService>(DecksService);
    mockDeckRepository = module.get(getRepositoryToken(Deck));
  });

  it('should generate correct code for cards', () => {
    const hearts9 = service.generateCardCode('9', CardSuit.Hearts);
    const diamonds10 = service.generateCardCode('10', CardSuit.Diamonds);
    expect(hearts9).toEqual('9H');
    expect(diamonds10).toEqual('10D');
  });

  it('should generate 52 cards for Full Deck', () => {
    const cards = service.generateCards({type: DeckType.Full,} ,'test');
    expect(cards).toHaveLength(52);
  });

  it('should generate 32 cards for Short Deck', () => {
    const cards = service.generateCards({type: DeckType.Short,} ,'test');
    expect(cards).toHaveLength(32);
  });
});
