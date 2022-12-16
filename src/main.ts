import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from '../config/configuration';
import { getCorsOptions, getNestOptions } from './app.options';
import { setSwagger } from './app.swagger';
import { initSaaS } from './app.saas';
import { interceptors } from './interceptor';
import { BusinessExceptionFilter } from './exception';
import { SocketIoAdapter } from './events/adapters/socket-io.adapters';

const {
  http: { port },
} = configuration();

async function bootstrap() {
  initSaaS();

  const app = await NestFactory.create(AppModule, getNestOptions());
  app.useWebSocketAdapter(new SocketIoAdapter(app));
  app.useGlobalInterceptors(...interceptors);
  app.useGlobalFilters(new BusinessExceptionFilter());
  app.enableCors(getCorsOptions());
  setSwagger(app);

  await app.listen(port);
}

void bootstrap();
