import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { getAuthProxyFactory } from '../factorys/proxy.factory';

import { GithubProfileStrategy } from './githubProdfile.strategy';
import { ErrorsInterceptor } from '../interceptors/errors.interceptor';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `./config.${process.env.NODE_ENV}.env`,
  })],
  providers: [
    AuthService,
 //   GithubProfileStrategy,
    ErrorsInterceptor,
    getAuthProxyFactory(),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
