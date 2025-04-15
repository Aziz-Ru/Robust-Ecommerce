import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { Category } from './entities/category.entity';
import { ProductImage } from './entities/image.entity';
import { Product } from './entities/product.entity';
import { Review } from './entities/review.entity';
import { ProductSize } from './entities/size.entity';
import { ProductImageService } from './image/image.service';
import { ProductsSizeServices } from './products-size.service';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Review,
      ProductSize,
      ProductImage,
      Category,
    ]),
  ],
  controllers: [ProductsController, CategoryController],
  providers: [
    ProductsService,
    ProductImageService,
    CategoryService,
    ProductsSizeServices,
  ],
})
export class ProductsModule {}
