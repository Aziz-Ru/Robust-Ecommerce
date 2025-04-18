import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductSize {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 3 })
  size: string;
  @Column({ type: 'int', default: 0 })
  stock: number;
  @ManyToOne(() => Product, (product) => product.sizes, {
    onDelete: 'CASCADE',
  })
  product: Product;
}
