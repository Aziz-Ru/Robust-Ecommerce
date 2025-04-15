import { Injectable } from '@nestjs/common';
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
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
