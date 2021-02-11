import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-github2';
import { of } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubProfileStrategy extends PassportStrategy(
  Strategy,
  'githubprofile',
) {
  constructor(private authService: AuthService, private configService: ConfigService) {
    super({
      clientID: configService.get<string>('STRATEGY_GITHUBPROFILE_CLIENTID'),
      clientSecret: configService.get<string>('STRATEGY_GITHUBPROFILE_CLIENTSECRET'),
      callbackURL: configService.get<string>('STRATEGY_GITHUBPROFILE_CALLBACKURL'),
      passReqToCallback: true,
      scope: ['repo'],
    });
  }

  validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
  ) {
    return of(
      Object.assign(profile._json, {
        accessToken,
        id: profile.id,
        provider: profile.provider,
      }),
    ).toPromise();
  }
}
