import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateLocalUserDto } from './dtos/create-local-user.dto';
import { GoogleAuthGuard } from './utils/Guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {
    console.log(this.configService.get('GOOGLE_CLIENT_ID'));
    return { msg: 'Redirecting to Google for login' };
  }
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleRedirect() {
    console.log('Google login redirect');
    return { msg: 'Google login successful' };
  }

  @Post('local/login')
  @UseGuards(AuthGuard('local'))
  async localLogin(@Request() req) {
    return req.user;
  }
  @Post('local/register')
  async localSignup(
    @Body(ValidationPipe) createlocalUserDto: CreateLocalUserDto,
  ) {
    return await this.authService.createLocalUser(createlocalUserDto);
  }
}
