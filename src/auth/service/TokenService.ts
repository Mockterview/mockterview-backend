import configuration from '../../../config/configuration';
import { JwtService } from '@nestjs/jwt';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../user/repository/UserRepository';
import { UserRepositoryToken } from '../../user/repository/persistence';
import { IssueTokenRequestDto } from '../controller/dto/request/IssueTokenRequestDto';
import { BusinessException } from '../../exception';
import { JwtSignOption } from '../JwtOption';
import { v4 as uuidv4 } from 'uuid';

const {
  jwt: { accessSecret, refreshSecret },
} = configuration();

export const TokenServiceToken = 'TokenServiceToken';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
  ) {}

  issueAccessToken(
    payload: IssueTokenRequestDto,
    option?: JwtSignOption,
  ): Promise<string> {
    return this.jwtService.signAsync(
      { type: 'access', ...payload.toJSON() },
      {
        jwtid: uuidv4(),
        secret: accessSecret,
        expiresIn: '2h',
        notBefore: '0h',
        ...option,
      },
    );
  }

  issueRefreshToken(
    payload: IssueTokenRequestDto,
    option?: JwtSignOption,
  ): Promise<string> {
    return this.jwtService.signAsync(
      { type: 'refresh', ...payload.toJSON() },
      {
        jwtid: uuidv4(),
        secret: refreshSecret,
        expiresIn: '14d',
        notBefore: '0h',
        ...option,
      },
    );
  }

  verifyAccessToken(token: string): boolean {
    try {
      this.jwtService.verify(token, {
        secret: accessSecret,
      });
      return true;
    } catch (e) {
      throw new BusinessException(
        'auth',
        e.stack,
        `${e.name} - ${e.message}`,
        e.name === 'TokenExpiredError' || token === undefined
          ? HttpStatus.FORBIDDEN
          : HttpStatus.UNAUTHORIZED,
      );
    }
  }

  verifyRefreshToken(token: string): boolean {
    try {
      this.jwtService.verify(token, {
        secret: refreshSecret,
      });
      return true;
    } catch (e) {
      throw new BusinessException(
        'auth',
        e.stack,
        `${e.name} - ${e.message}`,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
