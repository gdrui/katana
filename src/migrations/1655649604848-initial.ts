import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1655649604848 implements MigrationInterface {
  name = 'initial1655649604848';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "card" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying NOT NULL, "suit" character varying NOT NULL, "code" character varying NOT NULL, "used" boolean NOT NULL DEFAULT false, "deckId" uuid NOT NULL, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "deck" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL DEFAULT 'FULL', "shuffled" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_99f8010303acab0edf8e1df24f9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_673081effbabe22d74757339c60" FOREIGN KEY ("deckId") REFERENCES "deck"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_673081effbabe22d74757339c60"`,
    );
    await queryRunner.query(`DROP TABLE "deck"`);
    await queryRunner.query(`DROP TABLE "card"`);
  }
}
