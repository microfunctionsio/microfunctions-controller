import {CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable,} from '@nestjs/common';
import {Observable} from 'rxjs';
import {ClientProxy} from '@nestjs/microservices';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('authProxyFactory') private readonly clientProxy: ClientProxy,
  ) {}

  canActivate(context: ExecutionContext): Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const idnamespaces: string = req.params.idnamespaces;
    const idfunctions: string = req.params.idfunctions;
    const idcluster: string = req.params.idcluster;
    const pattern = { cmd: 'auth-user' };

    return this.clientProxy
      .send(pattern, {
        accessToken: req.headers.authorization?.split(' ')[1],
        idnamespaces,
        idfunctions,
        idcluster
      })
      .pipe(
        tap(user => {
          if (user) {
            req.user = user;
          } else {
            throw new ForbiddenException();
          }
        }),
      );
  }
}
