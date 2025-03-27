import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 255 })
  url: string;
  @Column({ type: 'boolean', default: false })
  isPrimary: boolean;
  @ManyToOne(() => Product, (product) => product.images)
  productId: string;
}
