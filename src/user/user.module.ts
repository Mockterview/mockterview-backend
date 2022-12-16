import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './user.schema';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './controller/UserController';
import {
  SignupServiceProvider,
  ValidateUserInfoServiceProvider,
  UserRepositoryProvider,
  UserMapperProvider,
  FindEmailServiceProvider,
  FindPasswordServiceProvider,
  EmailServiceProvider,
  GetUserServiceProvider,
  UserInfoServiceProvider,
  MyLikeServiceProvider,
  RemoveUserServiceProvider,
} from './user.providers';

import {
  LoginServiceProvider,
  LogoutServiceProvider,
  RefreshTokenServiceProvider,
  TokenServiceProvider,
} from '../auth/auth.providers';
import { InterviewModule } from '../interview/interview.module';
import { PracticeModule } from '../practice/practice.module';

@Module({
  imports: [
    MongooseModule.forFeature([userSchema], 'dbmockterview'),
    JwtModule.register({}),
    InterviewModule,
    PracticeModule,
  ],
  controllers: [UserController],
  providers: [
    SignupServiceProvider,
    ValidateUserInfoServiceProvider,
    FindEmailServiceProvider,
    FindPasswordServiceProvider,
    EmailServiceProvider,
    UserRepositoryProvider,
    UserMapperProvider,
    GetUserServiceProvider,
    UserInfoServiceProvider,
    MyLikeServiceProvider,
    RemoveUserServiceProvider,

    // 임시
    LoginServiceProvider,
    LogoutServiceProvider,
    RefreshTokenServiceProvider,
    TokenServiceProvider,
  ],
  exports: [UserRepositoryProvider, GetUserServiceProvider],
})
export class UserModule {}
