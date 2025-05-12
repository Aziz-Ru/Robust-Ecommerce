import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { AuthStragety } from '../../enums/auth.enum';

export class CreateLocalUserDto {
  @IsString()
  @Length(1, 255)
  name: string;

  @IsEmail()
  @Length(1, 255)
  email: string;

  @IsString()
  @Length(6, 63)
  password: string;

  @IsEnum(AuthStragety)
  authStrategy: AuthStragety;

  @IsUrl()
  @IsOptional()
  imageUrl: string;
}
