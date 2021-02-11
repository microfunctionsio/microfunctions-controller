import {
  BadRequestException,
  CallHandler,
  Catch,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Catch()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(err => {
        return of(err);
      }),
      map((err: any) => {
        if (err.status >= 400) {
          throw new BadRequestException(err);
        }
        return err;
      }),
    );
  }
}
