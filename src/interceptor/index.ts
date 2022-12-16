import { NestInterceptor } from '@nestjs/common';
import { SentryInterceptor } from './SentryInterceptor';
import { NewRelicInterceptor } from './NewRelicInterceptor';

export const interceptors: NestInterceptor[] = [
  new SentryInterceptor(),
  new NewRelicInterceptor(),
  // new HeaderInterceptor(),
];
