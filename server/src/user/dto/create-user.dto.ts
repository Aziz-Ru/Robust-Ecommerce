import { Length } from 'class-validator';

export class CreateUserDto {
  @Length(3, 255)
  username: string;
  @Length(4, 1023)
  password: string;
}
