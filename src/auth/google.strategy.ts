import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { of } from 'rxjs';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService, private configService: ConfigService) {
    super({
      clientID: configService.get<string>('STRATEGY_GOOGLE_CLIENTID'),
      clientSecret: configService.get<string>('STRATEGY_GOOGLE_CLIENTSECRET'),
      callbackURL: configService.get<string>('STRATEGY_GOOGLE_CALLBACKURL'),
      passReqToCallback: true,
      scope: ['profile', 'email'],
    });
  }

  validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
  ) {
    return this.authService
      .signinProvider(
        Object.assign(profile._json, {
          accessToken,
          id: profile.id,
          provider: profile.provider,
        }),
      )
      .toPromise();
  }
}
