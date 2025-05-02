import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService, UserPayload } from '../auth.service';
import RefreshJwtConfig from '../config/RefreshJwt.config';

// extract the payload from the JWT token
// and validate it
@Injectable()
export class RefresJwtStragety extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    @Inject(RefreshJwtConfig.KEY)
    private refreshConfig: ConfigType<typeof RefreshJwtConfig>,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: refreshConfig.secret,
      // Passport not to accept expired JWT tokens.
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }
  validate(req: Request, payload: any): Promise<UserPayload> {
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();
    // Here you can add logic to check if the refresh token is valid
    const p = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
    return this.authService.validateRefreshToken(refreshToken, p);
  }
}
