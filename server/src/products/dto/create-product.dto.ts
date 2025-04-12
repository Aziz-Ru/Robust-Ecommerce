import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUrl,
  IsUUID,
  Length,
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

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Size, { each: true })
  sizes: Size[];

  @IsArray()
  @ArrayNotEmpty()
  @IsUrl({}, { each: true })
  images: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  category: string[];
}
