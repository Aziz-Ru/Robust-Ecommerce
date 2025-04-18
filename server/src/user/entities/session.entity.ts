import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Users } from './user.entity';

@Entity({
  name: 'session',
})
export class Sessions {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  sessionToken: string;
  @ManyToOne(() => Users, (user) => user.session)
  @Index()
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @Column({ type: 'timestamp' })
  expires: Date;
}
