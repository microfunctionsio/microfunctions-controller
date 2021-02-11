import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { getAuthProxyFactory } from '../factorys/proxy.factory';
import { GoogleStrategy } from './google.strategy';
import { GithubStrategy } from './github.strategy';
import { GitHubAuthGuard } from './github.Guard';
import { GithubProfileStrategy } from './githubProdfile.strategy';
import { ErrorsInterceptor } from '../interceptors/errors.interceptor';
import { ConfigModule } from '@nestjs/config';
const environment = 'local';
@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `./config.${process.env.NODE_ENV || environment}.env`,
  })],
  providers: [
    AuthService,
    GoogleStrategy,
    GitHubAuthGuard,
    GithubProfileStrategy,
    ErrorsInterceptor,
    GithubStrategy,
    getAuthProxyFactory(),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
