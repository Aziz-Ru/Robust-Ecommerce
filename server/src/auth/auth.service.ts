import {
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { compare } from 'bcrypt';
import refresh_jwtConfig from 'src/auth/config/RefreshJwt.config';
import { SessionService } from 'src/user/session.service';
import { UserService } from 'src/user/user.service';
import { CreateLocalUserDto } from './dtos/create-local-user.dto';
import { LocalUserSignInDto } from './dtos/signin-local-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
    private jwtService: JwtService,
    @Inject(refresh_jwtConfig.KEY)
    private refreshJwtConfig: ConfigType<typeof refresh_jwtConfig>,
  ) {}
  async validateGoogleUser(createGoogleUserDto) {
    const user = await this.userService.findByEmail(createGoogleUserDto.email);
    if (user) {
      return user;
    }
    const newUser = await this.userService.create(createGoogleUserDto);
    return newUser;
  }

  async createLocalUser(createLocalUserDto: CreateLocalUserDto) {
    const user = await this.userService.findByEmail(createLocalUserDto.email);
    if (user) {
      throw new UnauthorizedException({
        msg: 'Invalid credentials',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }
    const newUser = await this.userService.create(createLocalUserDto);
    return {
      msg: 'User created successfully',
      statusCode: HttpStatus.CREATED,
      user: newUser,
    };
  }
  async validateLocalUser(signinDto: LocalUserSignInDto) {
    const user = await this.userService.findByEmail(signinDto.email);
    if (!user) {
      throw new UnauthorizedException({
        msg: 'Invalid credentials',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }
    const isPasswordValid = await compare(signinDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException({
        msg: 'Invalid credentials',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }
    return {
      id: user.id,
      email: user.email,
    };
  }

  async login(user: any) {
    const payload = { email: user.email, id: user.id };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshJwtConfig),
    ]);
    const hashedRefreshedToken = await argon.hash(refresh_token);
    await this.sessionService.createSession(hashedRefreshedToken, user.id);
    // Save the refresh token in the database
    return {
      access_token,
      refresh_token,
    };
  }

  async refreshToken(email: string, id: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync({ email, id }),
      this.jwtService.signAsync({ email, id }, this.refreshJwtConfig),
    ]);
    const hashedRefreshedToken = await argon.hash(refresh_token);
    await this.sessionService.deleteToken(id);
    // Delete the old session token
    await this.sessionService.createSession(hashedRefreshedToken, id);
    // Save the refresh token in the database
    return {
      access_token,
      refresh_token,
    };
  }

  async validateRefreshToken(token: string, userId: string, email: string) {
    const session = await this.sessionService.findSessionTokenionToken(userId);

    if (!session) {
      throw new UnauthorizedException({
        msg: 'unauthorized',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }
    const isValid = await argon.verify(session.sessionToken, token);
    if (!isValid) {
      throw new UnauthorizedException({
        msg: 'unauthorized',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }
    return { id: userId, email };
  }

  async logout(userId: string) {
    await this.sessionService.deleteToken(userId);
    return {
      msg: 'Logout successful',
      statusCode: HttpStatus.OK,
    };
  }
}
