import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
    return { msg: 'Product Created Successfully' };
  }

  @Get()
  findAll() {
    return this.productsService.findProductForCustomer();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
