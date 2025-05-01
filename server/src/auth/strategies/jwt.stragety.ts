import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import JwtConfig from '../config/Jwt.config';

// extract the payload from the JWT token
// and validate it
interface JwtPayload {
  sub: string;
  email: string;
}
@Injectable()
export class JwtStragety extends PassportStrategy(Strategy) {
  constructor(
    @Inject(JwtConfig.KEY)
    private JwtConfiguration: ConfigType<typeof JwtConfig>,
  ) {
    //This tells Passport how to extract and verify the JWT token.
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JwtConfiguration.secret,
      ignoreExpiration: false,
    });
  }
  // This is where you control what gets attached to req.user
  validate(payload: JwtPayload) {
    return { id: payload.sub, email: payload.email };
  }
}
