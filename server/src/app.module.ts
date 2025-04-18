import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import googleConfig from './config/google.config';
import { typeOrmConfig } from './config/typeorm.config';
import { LoggerMiddleware } from './logger.middleware';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forRootAsync(typeOrmConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [googleConfig],
    }),
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
