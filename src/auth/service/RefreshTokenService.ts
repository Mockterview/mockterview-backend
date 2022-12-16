import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { TokenService, TokenServiceToken } from './TokenService';
import {
  GetUserService,
  GetUserServiceToken,
} from '../../user/service/GetUserService';
import { LogoutService, LogoutServiceToken } from './LogoutService';
import { RefreshTokenRepository } from '../repository/RefreshTokenRepository';
import { UserRepositoryToken } from '../../user/repository/persistence';
import { UserRepository } from '../../user/repository/UserRepository';
import { BusinessException } from '../../exception';
import { IssueTokenRequestDto } from '../controller/dto/request/IssueTokenRequestDto';
import { ReissueAccessTokenResponseDto } from '../controller/dto/response/ReissueAccessTokenResponseDto';
import { ObjectID } from 'bson';

export const RefreshTokenServiceToken = 'RefreshTokenServiceToken';

@Injectable()
export class RefreshTokenService implements RefreshTokenRepository {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
    @Inject(TokenServiceToken)
    private readonly tokenService: TokenService,
    @Inject(GetUserServiceToken)
    private readonly getUserService: GetUserService,
    @Inject(LogoutServiceToken)
    private readonly logoutService: LogoutService,
  ) {}

  // TODO: 리턴이 void 인 경우 성공 여부를 어떻게 판단하는지?
  async updateRefreshToken(userId: string, token: string): Promise<number> {
    const hashed = bcrypt.hashSync(token, bcrypt.genSaltSync());
    const result = await this.userRepository.updateRefreshToken(userId, hashed);

    if (result === 0) {
      throw new BusinessException(
        'auth',
        'refreshToken DB update failed',
        '리프레시 토큰 갱신 실패',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return result;
  }

  async reissueAccessToken(
    userId: string,
    refreshToken: string,
  ): Promise<ReissueAccessTokenResponseDto> {
    try {
      this.tokenService.verifyRefreshToken(refreshToken);
    } catch (e) {
      await this.logoutService.logout(userId);
      throw new BusinessException(
        'auth',
        `Refresh token is not equal. userId: ${userId}`,
        '유효한 인증이 아닙니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const hashed = await this.getUserService.getUserRefreshTokenById(userId);
    const isMatched = bcrypt.compareSync(refreshToken, hashed);
    if (!isMatched) {
      await this.logoutService.logout(userId);
      throw new BusinessException(
        'auth',
        `Refresh token is not equal. userId: ${userId}`,
        '잘못된 토큰 정보입니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = new IssueTokenRequestDto(userId);
    const accessToken = await this.tokenService.issueAccessToken(payload);
    return new ReissueAccessTokenResponseDto(userId, accessToken);
  }
}
