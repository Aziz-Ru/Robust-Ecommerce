import { Injectable } from '@nestjs/common';
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

  // async deleteImage(imageUrl: string): Promise<void> {
  //   // Simulate an image deletion process
  //   // In a real application, you would delete the image from the cloud storage service.
  // }
}
