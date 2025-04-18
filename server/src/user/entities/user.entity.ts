import { hash } from 'bcrypt';
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Accounts } from './account.entity';
import { Sessions } from './session.entity';

@Entity({
  name: 'user',
})
export class Users {
  @PrimaryGeneratedColumn('uuid')
  @Index('user_id_index')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;
  //
  @Column({ type: 'varchar', length: 255, unique: true })
  @Index('user_email_index')
  email: string;
  //
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  emailVerified: Date;
  //
  @Column({ type: 'varchar', length: 255, enum: ['GOOGLE', 'LOCAL'] })
  authStrategy: string;
  //
  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;
  //
  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @OneToOne(() => Accounts, (account) => account.user)
  account: Accounts;

  @OneToMany(() => Sessions, (session) => session.user)
  session: Sessions[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
