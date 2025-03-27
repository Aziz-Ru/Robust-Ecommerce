import { Column, Entity, Index, ManyToMany, PrimaryColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Category {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  @Index()
  slug: string;
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToMany(() => Product, (product) => product.category)
  products: Product[];
}
