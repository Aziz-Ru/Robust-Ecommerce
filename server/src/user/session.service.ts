import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sessions } from './entities/session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Sessions)
    private sessionRepo: Repository<Sessions>,
  ) {}

  async createSession(createSessionDto) {
    const session = this.sessionRepo.create({
      sessionToken: createSessionDto.sessionToken,
      user: createSessionDto.userId,
      expires: new Date(),
    });
    return await this.sessionRepo.save(session);
  }
}
