import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryToken } from '../repository/persistence';
import { UserRepository } from '../repository/UserRepository';

export const ValidateUserInfoServiceToken = 'ValidateUserInfoServiceToken';

@Injectable()
export class ValidateUserInfoService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
  ) {}

  async isExistByEmail(email: string): Promise<boolean> {
    return !(await this.userRepository.findByEmail(email));
  }

  async isExistByPhone(phone: string): Promise<boolean> {
    return !(await this.userRepository.findByPhone(phone));
  }
}
