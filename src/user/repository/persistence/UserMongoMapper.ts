import { UserMongoEntity } from './UserMongoEntity';
import { Injectable } from '@nestjs/common';
import { User } from '../../domain/User';

export const UserMapperToken = 'UserMapperToken';

@Injectable()
export class UserMongoMapper {
  mapEntityToDomain(user: UserMongoEntity) {
    return new User(
      user._id.toString(),
      user.email,
      user.name,
      user.phone,
      user.password,
      user.refreshToken || '',
      user.changePassVerifyToken || '',
      user.studyDay,
    );
  }
}
