import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Size } from '../size-enum';
import { Product } from './product.entity';

@Entity()
export class ProductSize {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: Size })
  size: string;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @ManyToOne(() => Product, (product) => product.sizes)
  product: Product;
}
