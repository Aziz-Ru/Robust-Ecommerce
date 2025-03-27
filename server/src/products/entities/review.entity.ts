import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @Column({ type: 'text' })
  comment: string;
  @Column({ type: 'int' })
  rating: number;
  @ManyToOne(() => Product, (product) => product.reviews)
  productId: string;
}
