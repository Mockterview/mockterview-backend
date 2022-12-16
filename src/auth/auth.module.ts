import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './controller/AuthController';
import {
  LoginServiceProvider,
  LogoutServiceProvider,
  RefreshTokenServiceProvider,
  TokenServiceProvider,
} from './auth.providers';

@Module({
  imports: [JwtModule.register({}), UserModule],
  controllers: [AuthController],
  providers: [
    LoginServiceProvider,
    LogoutServiceProvider,
    RefreshTokenServiceProvider,
    TokenServiceProvider,
  ],
  exports: [JwtModule.register({}), UserModule, TokenServiceProvider],
})
export class AuthModule {}
