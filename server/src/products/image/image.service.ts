import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImage } from '../entities/image.entity';

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly imageRepo: Repository<ProductImage>,
  ) {}
  async uploadImage(files: string[], productId: string) {
    const otherImages = files.map((url, ind) => {
      return this.imageRepo.create({
        url,
        isPrimary: ind === 0,
        product: {
          id: productId,
        },
      });
    });
    await this.imageRepo.save(otherImages);

    return;
  }

  async deleteImage(id: string): Promise<void> {
    const result = await this.imageRepo.delete({
      id,
    });

    if (result.affected == 0) {
      throw new NotFoundException({
        statusCode: 404,
        msg: 'Image not found',
      });
    }
    return;
  }
}
