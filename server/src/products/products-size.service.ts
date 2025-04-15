import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSizeDto } from './dto/create-product.dto';
import { ProductSize } from './entities/size.entity';

@Injectable()
export class ProductsSizeServices {
  constructor(
    @InjectRepository(ProductSize)
    private productsSizeRepo: Repository<ProductSize>,
  ) {}

  async create(createProductSizeDto: ProductSizeDto[], productId) {
    const sizes = createProductSizeDto.map((sizedto) => {
      return this.productsSizeRepo.create({
        size: sizedto.size,
        stock: sizedto.stock,
        product: {
          id: productId,
        },
      });
    });
    await this.productsSizeRepo.save(sizes);
    return;
  }
}
