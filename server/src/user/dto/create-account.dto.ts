import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateAccountDto {
  @IsEnum(['GOOGLE', 'LOCAL'])
  provider: string;

  @IsNotEmpty()
  providerAccountId: string;
  refreshToken: string;
  accessToken: string;
  expiresAt: number;
  tokenType: string;
  idToken: string;
  scope: string;
  sessionState: string;
  @IsNotEmpty()
  userId: string;
}
