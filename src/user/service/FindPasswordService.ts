import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRepositoryToken } from '../repository/persistence';
import { UserRepository } from '../repository/UserRepository';
import { EmailService, EmailServiceToken } from './EmailService';
import { BusinessException } from '../../exception';
import * as uuid from 'uuid';
import { hash } from '../../utils/utils-encryption/Encryptions';

export const FindPasswordServiceToken = 'FindPasswordServiceToken';

// TODO: 용도 없다면 삭제
@Injectable()
export class FindPasswordService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
    @Inject(EmailServiceToken)
    private readonly emailService: EmailService,
  ) {}

  async findUserPassword(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new BusinessException(
        'auth',
        'find password request has wrong data',
        '검색된 회원이 없습니다!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const changePassVerifyToken = uuid.v1();
    await this.userRepository.updateChangeToken(
      user._id,
      changePassVerifyToken,
    );

    return await this.emailService.sendUserMailTransport(
      email,
      changePassVerifyToken,
    );
  }

  async emailFindByChangePassVerifyToken(token: string): Promise<string> {
    const email = await this.userRepository.findByChangePassVerifyToken(token);

    if (!email) {
      throw new BusinessException(
        'auth',
        'find token request has wrong data',
        '검색된 회원이 없습니다!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return email;
  }

  async changeUserPassword(email: string, password: string): Promise<number> {
    const result = await this.userRepository.updateChangePassword(
      email,
      hash(password),
    );

    if (result === 0) {
      throw new BusinessException(
        'auth',
        'change password error',
        '검색된 회원이 없습니다!',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userRepository.removeChangeToken(email);

    return result;
  }
}
