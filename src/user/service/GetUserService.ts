import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryToken } from '../repository/persistence';
import { UserRepository } from '../repository/UserRepository';

export const GetUserServiceToken = 'GetUserServiceToken';

@Injectable()
export class GetUserService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
  ) {}

  async getUserRefreshTokenById(userId: string): Promise<string> {
    const user = await this.userRepository.findById(userId);
    return user.refreshToken;
  }
}
