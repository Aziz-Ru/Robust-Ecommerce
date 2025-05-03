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
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;
  @Column({ type: 'varchar', length: 255 })
  session: string;
  @ManyToOne(() => Users, (user) => user.session)
  @Index()
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
