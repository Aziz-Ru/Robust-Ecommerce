import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['slug'])
export class Category {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  @Index()
  slug: string;
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToMany(() => Product, (product) => product.category)
  @JoinTable()
  products: Product[];
}
