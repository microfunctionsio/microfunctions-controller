import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const _ = require('lodash');

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { body, method, url, query } = req;

    const bodyClone = _.clone(body || {});
    delete bodyClone.password;
    console.log(
      `${new Date().toLocaleString()} ${url} ${method} begin||requestData:${
        method === 'GET' ? JSON.stringify(query) : JSON.stringify(bodyClone)
      }`,
    );
    const now = Date.now();
    return next.handle().pipe(

      tap(
        data =>
          console.log(
            `${new Date().toLocaleString()} ${url} ${method} end||responseBody:${JSON.stringify(
              bodyClone,
            )}||time:${Date.now() - now}ms`,
          ),
        err => {
          console.log(
            `${new Date().toLocaleString()} ${url} ${method} error||errorDetail:${JSON.stringify(
              err,
            )}||time:${Date.now() - now}ms`,
          );
        },
      ),
    );
  }
}
