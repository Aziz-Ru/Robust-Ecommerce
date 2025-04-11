import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUrl,
  Length,
} from 'class-validator';
import { Size } from '../size-enum';

export class CreateProductDto {
  @IsNotEmpty()
  @Length(4, 255)
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  discount: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  costPrice: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  stockThreshold: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  stock: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Size, { each: true })
  sizes: Size[];

  @IsArray()
  @ArrayNotEmpty()
  @IsUrl({}, { each: true })
  images: string[];
}
