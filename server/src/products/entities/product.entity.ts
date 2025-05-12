import { Category } from 'src/products/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './image.entity';
import { Review } from './review.entity';
import { ProductSize } from './size.entity';

//
@Entity({ name: 'products' })
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

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  costPrice: number;

  @Column({ type: 'int', default: 1 })
  stock: number;

  @Column({ type: 'int', default: 10 })
  stockThreshold: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'int' })
  totalSold: number;

  @Column({ type: 'decimal', precision: 2, scale: 2, default: 0 })
  rating: number;

  @Column({ type: 'int', default: 0 })
  totalReviews: number;

  @Column({ type: 'int', default: 0 })
  discount: number;

  @Column({ type: 'int', nullable: true })
  weight: number;


  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => ProductSize, (size) => size.product)
  sizes: ProductSize[];

  @OneToMany(() => ProductImage, (image) => image.product)
  images: ProductImage[];

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({
    name: 'product_categories',
    joinColumn: {
      name: 'productId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'categorySlug',
      referencedColumnName: 'slug',
    },
  })
  categories: Category[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];
}
