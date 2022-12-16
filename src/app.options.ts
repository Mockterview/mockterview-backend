import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import configuration from '../config/configuration';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export function getNestOptions() {
  const {
    env,
    service: { name },
  } = configuration();
  return {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: env === 'prod' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(name, {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
  };
}

/**
 * <Regex list>
 * 1. ^https://\S+.vercel.app → https:// 로 시작하며 .vercel.app 로 끝나는 url 허용
 * 2. ^https://\S+.[a-z0-9]{2,4} → https:// 로 시작하며 ip 주소를 제외한 모든 url 허용
 * 3. ^http(|s)://\S+.[a-z0-9]{2,4} → http:// 또는 https:// 로 시작하며 ip 주소를 제외한 모든 url 허용
 * 4. ^((https?:\/\/)?.*?([\w\d-]*\.[\w\d]+))($|\/.*$) → http:// 또는 https:// 로 시작하며 ip 주소를 제외한 모든 url 허용
 * 5. ^((https?:\/\/)?.*?([\w\d-]*\.[\w\d]+))($|\/.*$|\:\d+) → http:// 또는 https:// 로 시작하며 ip 주소를 포함한 모든 url 허용
 *
 * (!) ^https:\/\/\S+.vercel.app → "//" 는 특수문자이기 때문에 앞에 특수문자 앞에 "\"(역슬래시)를 붙여 표현하기도 함)
 */

export function getCorsOptions(): CorsOptions {
  // TODO: regex 로 vercel 등 허용.
  const whitelist = {
    local: ['http://127.0.0.1:3000', 'http://127.0.0.1:3001'],
    test: [
      'https://mockterview-frontend.vercel.app',
      'http://127.0.0.1:3000',
      'http://localhost:3000',
      'http://192.168.1.38:3000',
      'https://mockterview-frontend-dht22z1o1-dev-camp.vercel.app',
    ],
    prod: [
      'https://www.mockterview.xyz',
      'https://mockterview.xyz',
      'https://www.mockterview.shop',
      'https://mockterview.shop',
    ],
  };

  return {
    origin: [...whitelist.local, ...whitelist.test, ...whitelist.prod],
    methods: ['POST', 'PUT', 'DELETE', 'GET', 'PATCH', 'OPTIONS'],
    // maxAge: DAY,
    // preflightContinue: true,
  };
}
