import 'reflect-metadata';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'ecommerce',
  entities: ['dist/**/entities/*.entity.js'],
  migrations: ['dist/migrations/*.{js,ts}'],
  synchronize: false,
});
