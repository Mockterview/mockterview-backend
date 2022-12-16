import { Inject, Injectable } from '@nestjs/common';
import { SignupRequestDto } from '../controller/dto/request/SignupRequestDto';
import { ObjectID } from 'bson';
import { UserRepositoryToken } from '../repository/persistence';
import { UserRepository } from '../repository/UserRepository';
import { User } from '../domain/User';
import { hash } from '../../utils/utils-encryption/Encryptions';
import { UserResponseDto } from '../controller/dto/response/UserResponseDto';

export const SignupServiceToken = 'SignupServiceToken';

@Injectable()
export class SignupService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
  ) {}

  // TODO: 생성 시에는 유니크 정보를 돌려주어야 함.✅
  async saveUser(requestDto: SignupRequestDto): Promise<UserResponseDto> {
    const savedUser = await this.userRepository.save(
      new User(
        new ObjectID().toHexString(),
        requestDto.email,
        requestDto.name,
        requestDto.phone,
        hash(requestDto.password),
        '',
        '',
        [],
      ),
    );
    return new UserResponseDto(
      savedUser._id.toString(),
      savedUser.email,
      savedUser.name,
    );
  }
}
