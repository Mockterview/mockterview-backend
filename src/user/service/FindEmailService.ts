import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { UserRepositoryToken } from '../repository/persistence';
import { UserRepository } from '../repository/UserRepository';
import { BusinessException } from '../../exception';

export const FindEmailServiceToken = 'FindEmailServiceToken';

@Injectable()
export class FindEmailService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
  ) {}

  async findEmail(phone: string): Promise<string> {
    const email = await this.userRepository.findByPhone(phone);

    if (!email) {
      throw new BusinessException(
        'auth',
        'find email request has wrong data',
        '검색된 회원이 없습니다!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return email;
  }
}
