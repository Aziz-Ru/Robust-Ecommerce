import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Users } from './user.entity';

@Entity({
  name: 'account',
})
export class Accounts {
  @PrimaryColumn({
    type: 'varchar',
    enum: ['GOOGLE', 'FACEBOOK', 'TWITTER', 'LOCAL'],
  })
  provider: string;

  @PrimaryColumn({ type: 'varchar' })
  providerAccountId: string;

  @Column({ type: 'text', nullable: true })
  refreshToken: string;

  @Column({ type: 'text', nullable: true })
  accessToken: string;

  @Column({ type: 'int', nullable: true })
  expiresAt: number;

  @Column({ type: 'text', nullable: true })
  tokenType: string;
  @Column({ type: 'text', nullable: true })
  idToken: string;
  @Column({ type: 'varchar', nullable: true })
  scope: string;

  @Column({ type: 'text', nullable: true })
  sessionState: string;

  @OneToOne(() => Users, (user) => user.account)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
