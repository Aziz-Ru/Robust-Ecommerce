import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { CreateLocalUserDto } from './dtos/create-local-user.dto';
import { LocalUserSignInDto } from './dtos/signin-local-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
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
    };
  }
}
