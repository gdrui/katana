import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { DecksService } from './services/decks.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { DeckDto } from './dto/deck.dto';
import { Deck } from './entities/deck.entity';
import { FindOneParamsDto } from './dto/find-one-params.dto';
import { CountQueryDto } from './dto/count-query.dto';

@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Post()
  async create(@Body() createDeckDto: CreateDeckDto): Promise<DeckDto> {
    return await this.decksService.create(createDeckDto);
  }

  @Get()
  findAll(): Promise<Deck[]> {
    return this.decksService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParamsDto) {
    return this.decksService.findOne(params.id);
  }

  @Patch(':id/draw')
  drawCards(@Param() params: FindOneParamsDto, @Query() query: CountQueryDto) {
    return this.decksService.drawCards(params.id, query.count);
  }
}
