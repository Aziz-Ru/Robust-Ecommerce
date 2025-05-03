import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService, RefreshTokenPayload } from '../auth.service';
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
  validate(req: Request, payload: any): Promise<RefreshTokenPayload> {
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();
    // Here you can add logic to check if the refresh token is valid
    // console.log('refreshToken', refreshToken);
    // console.log('payload', payload);
    const p = {
      user_id: payload.id,
      role: payload.role,
      session_id: payload.session_id,
    };
    return this.authService.validateRefreshToken(p, refreshToken);
  }
}
