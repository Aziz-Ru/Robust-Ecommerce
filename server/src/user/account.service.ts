import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accounts } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Accounts)
    private accountRepo: Repository<Accounts>,
  ) {}

  async createAccount(createAccountDto) {
    const account = this.accountRepo.create({
      provider: createAccountDto.provider,
      providerAccountId: createAccountDto.providerAccountId,
      refreshToken: createAccountDto.refreshToken,
      accessToken: createAccountDto.accessToken,
      expiresAt: createAccountDto.expiresAt,
      tokenType: createAccountDto.tokenType,
      idToken: createAccountDto.idToken,
      scope: createAccountDto.scope,
      sessionState: createAccountDto.sessionState,
    });
    return await this.accountRepo.save(account);
  }
}
