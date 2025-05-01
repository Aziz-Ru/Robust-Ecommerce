import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { LoggerMiddleware } from './logger.middleware';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forRootAsync(typeOrmConfig),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

// ConfigModule.forRoot({
//   isGlobal: true,
//   load: [googleConfig, jwtConfig, refresh_jwtConfig],
// }),
