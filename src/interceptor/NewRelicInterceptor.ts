import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import * as newrelic from 'newrelic';

// const newrelic = require('newrelic');

@Injectable()
export class NewRelicInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return newrelic.startWebTransaction(context.getHandler().name, function () {
      const transaction = newrelic.getTransaction();
      return next.handle().pipe(tap(() => transaction.end()));
    });
  }
}
