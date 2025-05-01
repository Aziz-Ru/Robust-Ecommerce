import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './account.service';
import { Accounts } from './entities/account.entity';
import { Sessions } from './entities/session.entity';
import { Users } from './entities/user.entity';
import { SessionService } from './session.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Accounts, Sessions])],
  controllers: [UserController],
  providers: [UserService, AccountService, SessionService],
  exports: [UserService, AccountService, SessionService],
})
export class UserModule {}
