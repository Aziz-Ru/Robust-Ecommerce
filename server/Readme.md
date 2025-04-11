# Database Migration

## Create database int Database server

In src directory create a file data-source.ts

```
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

```

```

"typeorm": "nest build && npx typeorm -d dist/data-source.js",
"migration:generate": "npm run typeorm migration:generate",
"migration:run": "npm run typeorm migration:run",
"migration:revert": "npm run typeorm migration:revert"

```

## Generate Migration

```
 npm run migration:generate --n ./src/migrations/init

```
