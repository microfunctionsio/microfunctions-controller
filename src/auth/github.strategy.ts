import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-github2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private authService: AuthService, private configService: ConfigService) {
    super({
      clientID: configService.get<string>('STRATEGY_GITHUB_CLIENTID'),
      clientSecret: configService.get<string>('STRATEGY_GITHUB_CLIENTSECRET'),
      callbackURL: configService.get<string>('STRATEGY_GITHUB_CALLBACKURL'),
      passReqToCallback: true,
      includeEmail: true,
      scope: ['repo', 'user:email'],
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
          email: profile.emails[0].value,
        }),
      )
      .toPromise();
  }
}
