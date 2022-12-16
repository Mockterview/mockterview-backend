import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoginRepository } from '../repository/LoginRepository';
import { LoginResponseDto } from '../controller/dto/response/LoginResponseDto';
import { VerifyUserDto } from '../controller/dto/VerifyUserDto';
import { BusinessException } from '../../exception';
import { User } from '../../user/domain/User';
import { UserRepositoryToken } from '../../user/repository/persistence';
import { UserRepository } from '../../user/repository/UserRepository';
import * as bcrypt from 'bcrypt';
import { IssueTokenRequestDto } from '../controller/dto/request/IssueTokenRequestDto';
import { TokenService, TokenServiceToken } from './TokenService';
import {
  RefreshTokenService,
  RefreshTokenServiceToken,
} from './RefreshTokenService';

export const LoginServiceToken = 'LoginServiceToken';

@Injectable()
export class LoginService implements LoginRepository {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
    @Inject(TokenServiceToken)
    private readonly tokenService: TokenService,
    @Inject(RefreshTokenServiceToken)
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  async loginByEmail(
    email: string,
    password: string,
  ): Promise<LoginResponseDto> {
    const verifyUserDto = await this.verifyUserExistByEmail(email, password);
    if (!verifyUserDto) {
      throw new BusinessException(
        'auth',
        'email login request has wrong data',
        '이메일 또는 비밀번호를 확인해주시기 바랍니다,',
        HttpStatus.BAD_REQUEST,
      );
    }

    const userId = verifyUserDto._id;
    const payload = new IssueTokenRequestDto(userId);
    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.issueAccessToken(payload),
      this.tokenService.issueRefreshToken(payload),
    ]);

    await this.refreshTokenService.updateRefreshToken(
      userId.toString(),
      refreshToken,
    );

    return new LoginResponseDto(
      verifyUserDto._id.toString(),
      verifyUserDto.email,
      verifyUserDto.name,
      accessToken,
      refreshToken,
    );
  }

  async verifyUserExistByEmail(
    email: string,
    password: string,
  ): Promise<VerifyUserDto> | null {
    const user: User = await this.userRepository.findByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      return new VerifyUserDto(user);
    }
    return null;
  }
}
