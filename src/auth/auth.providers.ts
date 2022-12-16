import { LoginService, LoginServiceToken } from './service/LoginService';
import { LogoutService, LogoutServiceToken } from './service/LogoutService';
import {
  RefreshTokenService,
  RefreshTokenServiceToken,
} from './service/RefreshTokenService';
import { TokenService, TokenServiceToken } from './service/TokenService';

export const LoginServiceProvider = {
  provide: LoginServiceToken,
  useClass: LoginService,
};

export const LogoutServiceProvider = {
  provide: LogoutServiceToken,
  useClass: LogoutService,
};

export const RefreshTokenServiceProvider = {
  provide: RefreshTokenServiceToken,
  useClass: RefreshTokenService,
};

export const TokenServiceProvider = {
  provide: TokenServiceToken,
  useClass: TokenService,
};
