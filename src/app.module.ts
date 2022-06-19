import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { DecksModule } from './decks/decks.module';
import { Deck } from './decks/entities/deck.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    DecksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
