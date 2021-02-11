import {Body, Controller, Get, Post, Req, Res, UseGuards, ValidationPipe,} from '@nestjs/common';
import {Observable} from 'rxjs';
import {AuthCredentialsDto} from './dtos/auth-credentials.dto';
import {IAccessToken} from './IjwtPayload';
import {AuthService} from './auth.service';
import {AuthGuard} from '@nestjs/passport';
import {AuthGuard as CAuthGuard} from '../interceptors/auth.guard';
import {GitHubAuthGuard} from './github.Guard';
import {ConfigService} from '@nestjs/config';
import {GetUser} from '../decorators/get-user.decorator';
import {User} from '../classes/IUser';

@Controller('auth')

export class AuthController {
  constructor(private authService: AuthService, private configService: ConfigService) {
  }

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Observable<any> {
    return this.authService.signUp(authCredentialsDto);
  }
  @Post('/cli')
  @UseGuards(CAuthGuard)
  cli(
    @Body() cli: any, @GetUser() user: User,
  ): Observable<any> {
    return this.authService.generateCli(user);
  }

  @Get('/cli')
  @UseGuards(CAuthGuard)
  getAllCliKey(@Body() cli: any, @GetUser() user: User) {

    return this.authService.getALLcli(user);
  }
  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Observable<IAccessToken> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Get('/signin/google')
  @UseGuards(AuthGuard('google'))
  signinProviderGoogle() {

  }

  @Get('/signin/google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res) {
    const accessToken: string = req.user.accessToken;

    if (accessToken) {
      res.redirect(`${this.configService.get<string>('STRATEGY_REDIRECT_CALLBACKURL')}${accessToken}`);
    } else {
      res.redirect(`${this.configService.get<string>('STRATEGY_REDIRECT_LOGINURL')}`);
    }
  }

  @Get('/signin/github')
  @UseGuards(AuthGuard('github'))
  signinProviderGithub(@Req() req, @Res() res) {

  }

  @Get('/signin/github/callback')
  @UseGuards(AuthGuard('github'))
  githubLoginCallback(@Req() req, @Res() res) {
    const accessToken: string = req.user.accessToken;
    if (accessToken) {
      res.redirect(`${this.configService.get<string>('STRATEGY_REDIRECT_CALLBACKURL')}${accessToken}`);
    } else {
      res.redirect(`${this.configService.get<string>('STRATEGY_REDIRECT_LOGINURL')}`);
    }
  }

  @Get('/signin/githubprofile')
  @UseGuards(GitHubAuthGuard)
  signinProviderGithubProfile(@Req() req, @Res() res) {
  }

  @Get('/signin/githubprofile/callback')
  @UseGuards(GitHubAuthGuard)
  GithubProfileCallback(@Req() req, @Res() res) {
    const accessToken: string = req.user.accessToken;
    res.redirect(`${this.configService.get<string>('STRATEGY_REDIRECT_GITHUBPROFILE_CALLBACKURL')}${accessToken}&username=${req.user.login}&id=${req.user.id}`);

  }
}
