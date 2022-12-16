import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Response } from 'express';

@Injectable()
export class HeaderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(() => {
        const DAY = 60 * 60 * 24;
        const ctx = context.switchToHttp();
        const res = ctx.getResponse<Response>();
        res.header('Cache-Control', `public, max-age=${DAY}`);
      }),
    );
  }
}
