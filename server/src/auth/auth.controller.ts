import {
  Body,
  Controller,
  Post,
  Req,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Public } from 'src/decreators/public.decorator';
import { LocalAuthGuard } from 'src/guard/local-auth.guard';
import { RefreshJwtAuthGuard } from '../guard/refresh_jwt.guard';
import { AuthService } from './auth.service';
import { CreateLocalUserDto } from './dtos/create-local-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}
  /**
   * Logs in a user using the local strategy (email & password).
   *
   * This route is public and protected by the LocalAuthGuard which authenticates
   * the user before allowing access to this handler. On success, JWT tokens are returned.
   *
   * @param req - The request object containing authenticated user info (from LocalAuthGuard).
   * @returns An object containing the access token and refresh token.
   */
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('local/login')
  async localLogin(@Req() req) {
    const token = await this.authService.login(req.user);

    return {
      msg: 'Login successful',
      statusCode: 200,
      access_token: token.access_token,
      refresh_token: token.refresh_token,
    };
  }

  /**
   * Registers a new user using the local strategy (email & password).
   *
   * This route is public and allows users to create an account.
   *
   * @param createlocalUserDto - The DTO containing user registration data.
   * @returns A message indicating successful registration.
   */
  @Public()
  @Post('local/register')
  async localRegister(
    @Body(ValidationPipe) createlocalUserDto: CreateLocalUserDto,
  ) {
    return await this.authService.createLocalUser(createlocalUserDto);
  }

  /**
   * Refreshes JWT access and refresh tokens.
   *
   * Protected by the RefreshJwtAuthGuard and requires a valid refresh token.
   * Roles allowed: ADMIN, USER.
   *
   * @param req - The request object containing user session info.
   * @returns New access and refresh tokens.
   */
  @Public()
  // @Roles(Role.ADMIN, Role.USER)
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
  /**
   * Logs out a user by invalidating their session.
   *
   * Protected by the JwtAuthGuard and requires a valid JWT token.
   * Roles allowed: ADMIN, USER.
   *
   * @param req - The request object containing user info.
   * @returns A message indicating successful logout.
   */

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

// @Get('google/login')
// @UseGuards(GoogleAuthGuard)
// async googleLogin() {
//   console.log(this.configService.get('GOOGLE_CLIENT_ID'));
//   return { msg: 'Redirecting to Google for login' };
// }
// @UseGuards(GoogleAuthGuard)
// @Get('google/redirect')
// async googleRedirect() {
//   console.log('Google login redirect');
//   return { msg: 'Google login successful' };
// }
