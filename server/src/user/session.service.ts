import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSessionDto } from './dto/create-session.dto';
import { Sessions } from './entities/session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Sessions)
    private sessionRepo: Repository<Sessions>,
  ) {}

  async createSession(createSessionDto: CreateSessionDto) {
    const session = this.sessionRepo.create({
      id: createSessionDto.id,
      session: createSessionDto.session,
      user: {
        id: createSessionDto.userId,
      },
    });
    //expires: new Date(Date.now() + 7 * 24 * 3600 * 1000),
    return await this.sessionRepo.save(session);
  }
  async findSessionTokenionToken(id: string) {
    return await this.sessionRepo.findOne({
      where: {
        id,
      },
    });
  }
  async deleteToken(id: string) {
    await this.sessionRepo.delete({ id });

    return;
  }
}
