import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const category = {
      name: createCategoryDto.name,
      slug: createCategoryDto.name.toLowerCase().replace(/\s+/g, '-'),
    };
    const createdCategory = this.categoryRepo.save(category);
    return createdCategory;
  }

  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(slug: string) {
    slug = slug.toLowerCase().replace(/\s+/g, '-');

    const category = await this.categoryRepo.findOne({
      where: {
        slug: slug,
      },
      relations: {
        products: true,
      },
    });
    if (!category) {
      throw new NotFoundException(`Category with name ${slug} not found`);
    }
    return category;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
