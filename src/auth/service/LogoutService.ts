import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryToken } from '../../user/repository/persistence';
import { UserRepository } from '../../user/repository/UserRepository';

export const LogoutServiceToken = 'LogoutServiceToken';

@Injectable()
export class LogoutService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
  ) {}

  async logout(userId: string): Promise<number> {
    return this.userRepository.cleanupTokenById(userId);
  }
}
