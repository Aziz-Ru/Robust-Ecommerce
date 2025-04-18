import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { LocalStrategy } from './utils/LocalStrategy';

@Module({
  imports: [ConfigModule, UserModule],
  controllers: [AuthController],
  providers: [GoogleStrategy, LocalStrategy, AuthService],
})
export class AuthModule {}
