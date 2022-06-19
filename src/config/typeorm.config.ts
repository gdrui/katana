import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: process.env.NODE_ENV === 'test' ? 5433 : 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'katana',
  autoLoadEntities: true,
  entities: [__dirname + '/../**/entities/*{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  migrationsRun: true,
  synchronize: false,
  logging: true,
};
