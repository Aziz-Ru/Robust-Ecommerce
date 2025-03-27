import {
  Column,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { ProductImage } from './image.entity';
import { Review } from './review.entity';
import { ProductSize } from './size.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  discount: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  costPrice: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'int' })
  stockThreshold: number;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'int' })
  totalSold: number;

  @Column({ type: 'decimal', precision: 2, scale: 2 })
  rating: number;

  @OneToMany(() => ProductSize, (size) => size.product)
  sizes: ProductSize[];

  @OneToMany(() => ProductImage, (image) => image.productId)
  images: ProductImage[];

  @ManyToMany(() => Category, (category) => category.products)
  category: Category[];

  @OneToMany(() => Review, (review) => review.productId)
  reviews: Review[];
}
