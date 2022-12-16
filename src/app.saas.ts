import configuration from '../config/configuration';
import * as Sentry from '@sentry/node';

const {
  env,
  sentry: { dsn },
} = configuration();

export function initSaaS() {
  Sentry.init({
    dsn,
    environment: env,
  });
}
