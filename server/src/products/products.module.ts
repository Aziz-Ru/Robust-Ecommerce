import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { ProductImage } from './entities/image.entity';
import { Product } from './entities/product.entity';
import { Review } from './entities/review.entity';
import { ProductSize } from './entities/size.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Category,
      Review,
      ProductSize,
      ProductImage,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
