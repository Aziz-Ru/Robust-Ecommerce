import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { JwtAuthGuard } from './guard/jwt.guard';
import { RolesGuard } from './guard/roles.guard';
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
  providers: [
    // Global guards
    // APP_GUARD is a global guard that will be applied to all routes
    // JwtAuthGuard is a guard that checks if the user is authenticated using JWT
    // RolesGuard is a guard that checks if the user has the required roles
    // to access the route
    // APP_GUARD is a global guard that will be applied to all routes
    // If Public route then use Public Decorator
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
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
