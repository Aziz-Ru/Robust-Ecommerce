import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
    @InjectDataSource()
    private datasource: DataSource,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const slug = createCategoryDto.name.toLowerCase().replace(/\s+/g, '-');
    const existingCategory = await this.categoryRepo.findOne({
      where: {
        slug,
      },
    });
    if (existingCategory) {
      throw new ConflictException(
        `Category with name ${createCategoryDto.name} already exists`,
      );
    }
    const category = this.categoryRepo.create({
      ...createCategoryDto,
      slug: slug,
    });
    const createdCategory = await this.categoryRepo.save(category);
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
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException(`Category with name ${slug} not found`);
    }
    return category;
  }

  update(slug: string, updateCategoryDto: UpdateCategoryDto) {
    slug = slug.toLowerCase().replace(/\s+/g, '-');
    const res = this.datasource.transaction(async (manager) => {
      const cateRepo = manager.getRepository(Category);
      const existingCategory = await cateRepo.findOne({
        where: {
          slug: slug,
        },
      });
      if (!existingCategory) {
        throw new NotFoundException(`Category with name ${slug} not found`);
      }
      const updatedCategory = await cateRepo.save({
        ...existingCategory,
        ...updateCategoryDto,
      });
      return updatedCategory;
    });

    return res;
  }

  async remove(slug: string) {
    return await this.categoryRepo.delete({
      slug: slug,
    });
  }
}
