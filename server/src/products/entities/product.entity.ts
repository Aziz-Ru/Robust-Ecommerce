import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
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

  @Column({ type: 'low', length: 255 })
  sku: string;

  @Column({ type: 'varchar', length: 255 })
  image: string;
}
