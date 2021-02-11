import { Inject, Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { IAccessToken } from './IjwtPayload';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { catchError } from 'rxjs/operators';
export enum Provider {
  GOOGLE = 'google',
}
@Injectable()
export class AuthService {
  constructor(
    @Inject('authProxyFactory') private readonly clientProxy: ClientProxy,
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDto) {
    const pattern = { cmd: 'auth-signUp' };
    return this.send(pattern, authCredentialsDto);
  }

  signIn(authCredentialsDto: AuthCredentialsDto): Observable<IAccessToken> {
    const pattern = { cmd: 'auth-signIn' };
    return this.send(pattern, authCredentialsDto);
  }
  generateCli(cli:any ): Observable<any> {
    const pattern = { cmd: 'auth-generate-cli' };
    return this.send(pattern, cli);
  }
  getALLcli(user:any ): Observable<any> {
    const pattern = { cmd: 'get-cli-keys' };
    return this.send(pattern, user);
  }

  signinProvider(profile: any): Observable<IAccessToken> {
    const pattern = { cmd: 'auth-signIn-provider' };
    return this.send(pattern, profile);
  }
  private send(pattern: any, payload: any) {
    return this.clientProxy.send(pattern, payload);
  }
}
