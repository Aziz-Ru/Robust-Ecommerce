import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductSize {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ['NONE', 'XS', 'S', 'M', 'L', 'XL', 'XXL'] })
  size: string;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @ManyToOne(() => Product, (product) => product.sizes)
  product: Product;
}
