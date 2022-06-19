import { Module } from '@nestjs/common';
import { DecksService } from './services/decks.service';
import { DecksController } from './decks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deck } from './entities/deck.entity';
import { Card } from './entities/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deck, Card])],
  controllers: [DecksController],
  providers: [DecksService]
})
export class DecksModule {}
