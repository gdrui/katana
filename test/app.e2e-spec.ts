import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Deck } from 'src/decks/entities/deck.entity';
import { Repository } from 'typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let deckRepository: Repository<Deck>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    deckRepository = moduleFixture.get('DeckRepository');
  });

  afterEach(async () => {
    return await deckRepository.query('DELETE FROM deck');
  });

  it('/decks (GET) should list decks', () => {
    return request(app.getHttpServer()).get('/decks').expect(200).expect('[]');
  });

  it('/decks (POST) should create a default deck of cards', async () => {
    const response = await request(app.getHttpServer())
      .post('/decks')
      .expect(201);

    expect(response.body.remaining).toEqual('52');
    expect(response.body.type).toEqual('FULL');
    expect(response.body.shuffled).toEqual(false);
  });

  it('/decks (POST) should create a short deck of cards', async () => {
    const response = await request(app.getHttpServer())
      .post('/decks')
      .send({ type: 'SHORT' })
      .expect(201);

    expect(response.body.remaining).toEqual('32');
    expect(response.body.type).toEqual('SHORT');
    expect(response.body.shuffled).toEqual(false);
  });

  it('/decks (POST) should create a shuffled deck of cards', async () => {
    const response = await request(app.getHttpServer())
      .post('/decks')
      .send({ shuffled: true })
      .expect(201);

    expect(response.body.remaining).toEqual('52');
    expect(response.body.type).toEqual('FULL');
    expect(response.body.shuffled).toEqual(true);
  });

  it('/decks/:id (GET) should open a deck of cards', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/decks')
      .expect(201);

    const response = await request(app.getHttpServer())
      .get('/decks/' + createResponse.body.deckId)
      .expect(200);

    expect(response.body.remaining).toEqual('52');
    expect(response.body.type).toEqual('FULL');
    expect(response.body.deckId).toEqual(createResponse.body.deckId);
    expect(response.body.cards).toHaveLength(52);
  });

  it('/decks/:id (PATCH) should draw a card from the deck', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/decks')
      .expect(201);

    const drawDresponse = await request(app.getHttpServer())
      .patch('/decks/' + createResponse.body.deckId + '/draw?count=3')
      .expect(200);

    expect(drawDresponse.body).toHaveLength(3);

    const response = await request(app.getHttpServer())
      .get('/decks/' + createResponse.body.deckId)
      .expect(200);

    expect(response.body.remaining).toEqual('49');
  });
});
