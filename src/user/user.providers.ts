import { SignupService, SignupServiceToken } from './service/SignupService';
import {
  UserMapperToken,
  UserMongoMapper,
  UserRepositoryToken,
  UserMongoRepository,
} from './repository/persistence';
import {
  ValidateUserInfoService,
  ValidateUserInfoServiceToken,
} from './service/ValidateUserInfoService';
import {
  FindEmailService,
  FindEmailServiceToken,
} from './service/FindEmailService';
import {
  FindPasswordService,
  FindPasswordServiceToken,
} from './service/FindPasswordService';
import { EmailService, EmailServiceToken } from './service/EmailService';
import { GetUserService, GetUserServiceToken } from './service/GetUserService';
import {
  UserInfoService,
  UserInfoServiceToken,
} from './service/UserInfoService';
import { MyLikeService, MyLikeServiceToken } from './service/MyLikeService';
import {
  RemoveUserService,
  RemoveUserServiceToken,
} from './service/RemoveUserService';

export const SignupServiceProvider = {
  provide: SignupServiceToken,
  useClass: SignupService,
};

export const ValidateUserInfoServiceProvider = {
  provide: ValidateUserInfoServiceToken,
  useClass: ValidateUserInfoService,
};

export const UserRepositoryProvider = {
  provide: UserRepositoryToken,
  useClass: UserMongoRepository,
};

export const UserMapperProvider = {
  provide: UserMapperToken,
  useClass: UserMongoMapper,
};

export const FindEmailServiceProvider = {
  provide: FindEmailServiceToken,
  useClass: FindEmailService,
};

export const FindPasswordServiceProvider = {
  provide: FindPasswordServiceToken,
  useClass: FindPasswordService,
};

export const EmailServiceProvider = {
  provide: EmailServiceToken,
  useClass: EmailService,
};

export const GetUserServiceProvider = {
  provide: GetUserServiceToken,
  useClass: GetUserService,
};

export const UserInfoServiceProvider = {
  provide: UserInfoServiceToken,
  useClass: UserInfoService,
};

export const MyLikeServiceProvider = {
  provide: MyLikeServiceToken,
  useClass: MyLikeService,
};

export const RemoveUserServiceProvider = {
  provide: RemoveUserServiceToken,
  useClass: RemoveUserService,
};
