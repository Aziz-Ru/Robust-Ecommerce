import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { ProductSize } from './entities/size.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @InjectRepository(ProductSize)
    private productSizeRepo: Repository<ProductSize>,
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const categories = await this.categoryRepo.find({
        where: {
          slug: In(createProductDto.categories),
        },
      });

      const newProduct = this.productRepo.create({
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        discount: createProductDto.discount,
        costPrice: createProductDto.costPrice,
        stock: createProductDto.stock,
        stockThreshold: createProductDto.stockThreshold,
        isActive: true,
        totalSold: 0,
        rating: 0.0,
        categories: categories,
      });

      return await this.productRepo.save(newProduct);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException('Error creating product');
    }
  }

  findAll() {
    return this.productRepo.find({
      where: {
        price: 200,
      },
    });
  }
  findProductForCustomer() {
    return this.productRepo.find();
  }

  async findOne(id: string) {
    const product = await this.productRepo.findOne({
      where: {
        id,
      },
      relations: {
        sizes: true,
        images: true,
        reviews: true,
      },
    });

    if (!product) {
      throw new NotFoundException({
        msg: 'Product not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const res = await this.productRepo.update(
        {
          id,
        },
        {
          price: updateProductDto.price,
          discount: updateProductDto.discount,
          costPrice: updateProductDto.costPrice,
          stock: updateProductDto.stock,
          stockThreshold: updateProductDto.stockThreshold,
          isActive: updateProductDto.isActive,
          name: updateProductDto.name,
          description: updateProductDto.description,
        },
      );
      if (res.affected === 0) {
        throw new InternalServerErrorException('Product not found');
      }
      return;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error updating product');
    }
  }

  remove(id: number) {
    this.productRepo.delete(id);
    return { msg: 'Product Deleted Successfully' };
  }
}
