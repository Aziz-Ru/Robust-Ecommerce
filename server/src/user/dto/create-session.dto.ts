import { IsNotEmpty } from 'class-validator';

export class CreateSessionDto {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  session: string;
  @IsNotEmpty()
  userId: string;
}
