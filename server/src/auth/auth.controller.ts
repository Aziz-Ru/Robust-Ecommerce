import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { CreateLocalUserDto } from './dtos/create-local-user.dto';
import { GoogleAuthGuard } from './guard/google-auth.guard';
import { JwtAuthGuard } from './guard/jwt.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { RefreshJwtAuthGuard } from './guard/refresh_jwt.guard';

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
  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  async googleRedirect() {
    console.log('Google login redirect');
    return { msg: 'Google login successful' };
  }

  @UseGuards(LocalAuthGuard)
  @Post('local/login')
  async localLogin(@Req() req) {
    // console.log(req.user);
    const token = await this.authService.login(req.user);

    return {
      msg: 'Login successful',
      statusCode: 200,
      access_token: token.access_token,
      refresh_token: token.refresh_token,
    };
  }

  @Post('local/register')
  async localSignup(
    @Body(ValidationPipe) createlocalUserDto: CreateLocalUserDto,
  ) {
    return await this.authService.createLocalUser(createlocalUserDto);
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('local/refresh')
  async refreshToken(@Request() req) {
    const { user_id, role, session_id } = req.user;
    const { access_token, refresh_token } = await this.authService.refreshToken(
      { user_id, role, session_id },
    );
    return {
      msg: 'access token refreshed successfully',
      statusCode: 200,
      access_token,
      refresh_token,
    };
  }
  @UseGuards(JwtAuthGuard)
  @Post('local/logout')
  async logout(@Request() req) {
    const { id } = req.user;
    return await this.authService.logout(id);
  }
}

/**
 * Request comes in to POST /auth/local/login.
 * LocalAuthGuard (which extends AuthGuard('local')) is triggered.
 * AuthGuard('local') uses your LocalStrategy (username + password).
 * It looks for a strategy named 'local' → which is your custom LocalStrategy.
 * If authentication is successful:
 * It attaches the user object to req.user.
 * It allows the request to continue to localLogin().
 * Inside localLogin():
 * req.user is already populated with the validated user data.
 */
