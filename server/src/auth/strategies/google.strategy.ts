import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import googleConfig from 'src/auth/config/Google.config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(googleConfig.KEY)
    private gConfig: ConfigType<typeof googleConfig>,
    private authService: AuthService,
  ) {
    super({
      clientID: gConfig.GOOGLE_CLIENT_ID,
      clientSecret: gConfig.GOOGLE_CLIENT_SECRET,
      callbackURL: gConfig.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    this.authService.validateGoogleUser({
      email: profile.emails[0].value,
      name: profile.displayName,
      imageUrl: profile.photos[0].value,
    });
  }
}
