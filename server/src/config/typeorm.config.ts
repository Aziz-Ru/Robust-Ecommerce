import { config } from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
config();

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'ecommerce',
  entities: [__dirname + '../**/entities/*.entity.{js,ts}'],
  migrations: [__dirname + '../../migrations/*.{js,ts}'],
  migrationsTableName: 'migrations',
  synchronize: false,
});

// export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
//   useFactory: () => ({}),
// };

// import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

// export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
//   useFactory: () => ({
//     type: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     username: 'postgres',
//     password: '123456',
//     database: 'ecommerce',
//     entities: [__dirname + '/**/entities/*.entity.{js,ts}'],
//     migrations: [__dirname + '/migrations/*.{js,ts}'],
//     synchronize: false,
//     autoLoadEntities: true,
//   }),
// };
