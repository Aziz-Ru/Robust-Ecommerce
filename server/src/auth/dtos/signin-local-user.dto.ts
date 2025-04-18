import { IsEmail, IsString, Length } from 'class-validator';

export class LocalUserSignInDto {
  @IsEmail()
  @Length(1, 255)
  email: string;

  @IsString()
  @Length(6, 63)
  password: string;
}
