import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Sessions } from './entities/session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Sessions)
    private sessionRepo: Repository<Sessions>,
  ) {}

  async createSession(token: string, userId: string) {
    const session = this.sessionRepo.create({
      sessionToken: token,
      user: {
        id: userId,
      },
      expires: new Date(Date.now() + 7 * 24 * 3600 * 1000),
    });
    return await this.sessionRepo.save(session);
  }
  async findSessionTokenionToken(userId: string) {
    return await this.sessionRepo.findOne({
      where: {
        user: {
          id: userId,
        },
        expires: MoreThan(new Date()),
      },
    });
  }
  async deleteToken(userId: string) {
    const sessions = await this.sessionRepo.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
    return await this.sessionRepo.remove(sessions);
  }
}
