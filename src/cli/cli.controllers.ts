import { Controller, Delete, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthGuard as CAuthGuard } from '../interceptors/auth.guard';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../classes/IUser';

@Controller('cli')
export class CliControllers {
  constructor(@Inject('authProxyFactory') private readonly clientProxy: ClientProxy) {
  }

  @Get()
  @UseGuards(CAuthGuard)
  getAllCliKey(@GetUser() user: User) {

    return this.getALLClikey(user);
  }

  @Get('/generate')
  @UseGuards(CAuthGuard)
  generateCli(@GetUser() user: User) {
    const pattern = { cmd: 'auth-generate-cli' };
    return this.send(pattern, user);
  }
  @Delete('/:id')
  @UseGuards(CAuthGuard)
  deleteCliKey(@GetUser() user: User, @Param('id') cliKeyId: string): Observable<any> {
    const pattern = { cmd: 'delete-cli-key' };
    return this.send(pattern, Object.assign(user, { cliKeyId }));
  }
  getALLClikey(user: any): Observable<any> {
    const pattern = { cmd: 'get-cli-keys' };
    return this.send(pattern, user);
  }



  private send(pattern: any, payload: any) {
    return this.clientProxy.send(pattern, payload);
  }
}
