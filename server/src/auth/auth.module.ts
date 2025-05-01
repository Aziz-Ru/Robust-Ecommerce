// auth module
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sessions } from 'src/user/entities/session.entity';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import GoogleConfig from './config/Google.config';
import JwtConfig from './config/Jwt.config';
import RefreshJwtConfig from './config/RefreshJwt.config';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStragety } from './strategies/jwt.stragety';
import { LocalStrategy } from './strategies/local.strategy';
import { RefresJwtStragety } from './strategies/refresh_token.strategy';
/**
 * ConfigModule
 * This module reads environment variables (.env), and allows you to organize and access them cleanly.
 * You’re registering named config objects for:Google OAuth (googleOAuth) Access Token (jwt) Refresh Token (refresh-jwt)
 *
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [GoogleConfig, JwtConfig, RefreshJwtConfig],
    }),
    TypeOrmModule.forFeature([Sessions]),
    JwtModule.registerAsync(JwtConfig.asProvider()),
    JwtModule.registerAsync(RefreshJwtConfig.asProvider()),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    LocalStrategy,
    AuthService,
    JwtStragety,
    RefresJwtStragety,
  ],
})
export class AuthModule {}
