import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductImageService } from './image/image.service';
import { ProductsSizeServices } from './products-size.service';
import { ProductsService } from './products.service';

/**{
  path: 'products',
  version: '1',
} */

@Controller({
  path: 'products',
  version: '1',
})
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productsSizeService: ProductsSizeServices,
    private readonly productsImageService: ProductImageService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(ValidationPipe) createProductDto: CreateProductDto) {
    const newProduct = await this.productsService.create(createProductDto);
    await this.productsSizeService.create(
      createProductDto.sizes,
      newProduct.id,
    );
    await this.productsImageService.uploadImage(
      createProductDto.images,
      newProduct.id,
    );
    return {
      statusCode: HttpStatus.CREATED,
      msg: 'Product Created Successfully',
      data: {
        id: newProduct.id,
      },
    };
  }

  @Get()
  async findAll() {
    const products = await this.productsService.findAll();
    return {
      statusCode: HttpStatus.OK,
      msg: 'Products fetched successfully',
      data: products,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const product = await this.productsService.findOne(id);

    return {
      statusCode: HttpStatus.OK,
      msg: 'Product fetched successfully',
      data: product,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    await this.productsService.update(id, updateProductDto);
    return { msg: 'Product updated successfully', statusCode: HttpStatus.OK };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.productsService.remove(id);

    return { msg: 'Product deleted successfully', statusCode: HttpStatus.OK };
  }
}
