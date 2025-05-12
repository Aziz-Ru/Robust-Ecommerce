import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Length,
  ValidateNested,
} from 'class-validator';
import { Size } from '../size-enum';

export class CreateProductDto {
  @IsNotEmpty()
  @Length(4, 255)
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  discount: number;

  @IsNumber()
  @IsPositive()
  costPrice: number;

  @IsNumber()
  @IsPositive()
  stockThreshold: number;

  @IsNumber()
  @IsPositive()
  stock: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  weight: number;

  @IsBoolean()
  isActive: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductSizeDto)
  sizes: ProductSizeDto[];

  @IsArray()
  @ArrayNotEmpty()
  @IsUrl({}, { each: true })
  images: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  categories: string[];
}

export class ProductSizeDto {
  @IsNotEmpty()
  @IsEnum(Size, { each: true })
  size: Size;

  @IsNumber()
  @IsPositive()
  stock: number;

  @IsNumber()
  @IsPositive()
  price: number;
}
