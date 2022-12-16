import {
  Body,
  Controller,
  HttpStatus,
  HttpException,
  Post,
  Get,
  Param,
  Patch,
  Inject,
  Query,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SignupRequestDto } from './dto/request/SignupRequestDto';
import { SignupService, SignupServiceToken } from '../service/SignupService';
import {
  LoginService,
  LoginServiceToken,
} from '../../auth/service/LoginService';
import {
  LogoutService,
  LogoutServiceToken,
} from '../../auth/service/LogoutService';
import {
  TokenService,
  TokenServiceToken,
} from '../../auth/service/TokenService';
import {
  RefreshTokenService,
  RefreshTokenServiceToken,
} from '../../auth/service/RefreshTokenService';
import { EmailRequestDto } from './dto/request/EmailRequestDto';
import { LoginRequestDto } from '../../auth/controller/dto/request/LoginRequestDto';
import {
  ValidateUserInfoService,
  ValidateUserInfoServiceToken,
} from '../service/ValidateUserInfoService';
import {
  FindPasswordService,
  FindPasswordServiceToken,
} from '../service/FindPasswordService';
import { PhoneRequestDto } from './dto/request/PhoneRequestDto';
import {
  FindEmailService,
  FindEmailServiceToken,
} from '../service/FindEmailService';
import { UserResponseDto } from './dto/response/UserResponseDto';
import { RefreshTokenRequestDto } from '../../auth/controller/dto/request/RefreshTokenRequestDto';
import { ReissueAccessTokenResponseDto } from '../../auth/controller/dto/response/ReissueAccessTokenResponseDto';
import {
  UserInfoService,
  UserInfoServiceToken,
} from '../service/UserInfoService';
import { UserIdRequestDto } from './dto/request/UserIdRequestDto';
import { UserInfoResponseDto } from './dto/response/UserInfoResponseDto';
import { MyLikeService, MyLikeServiceToken } from '../service/MyLikeService';
import { LikePracticeResponseDto } from './dto/response/LikePracticeResponseDto';
import {
  RemoveUserService,
  RemoveUserServiceToken,
} from '../service/RemoveUserService';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(
    @Inject(SignupServiceToken)
    private readonly signupService: SignupService,
    @Inject(ValidateUserInfoServiceToken)
    private readonly validateUserService: ValidateUserInfoService,
    @Inject(FindPasswordServiceToken)
    private readonly findPasswordService: FindPasswordService,
    @Inject(LoginServiceToken)
    private readonly loginService: LoginService,
    @Inject(LogoutServiceToken)
    private readonly logoutService: LogoutService,
    @Inject(FindEmailServiceToken)
    private readonly findEmailService: FindEmailService,
    @Inject(TokenServiceToken)
    private readonly tokenService: TokenService,
    @Inject(RefreshTokenServiceToken)
    private readonly refreshTokenService: RefreshTokenService,
    @Inject(UserInfoServiceToken)
    private readonly userInfoService: UserInfoService,
    @Inject(MyLikeServiceToken)
    private readonly myLikeService: MyLikeService,
    @Inject(RemoveUserServiceToken)
    private readonly removeUserService: RemoveUserService,
  ) {}

  @Post('signup/validate/email')
  async validateEmail(@Body() requestDto: EmailRequestDto): Promise<void> {
    const isExist = await this.validateUserService.isExistByEmail(
      requestDto.email,
    );
    if (!isExist) throw new HttpException('CONFLICT', HttpStatus.CONFLICT);
  }

  @Post('signup/validate/phone')
  async validatePhone(@Body() requestDto: PhoneRequestDto): Promise<void> {
    const isExist = await this.validateUserService.isExistByPhone(
      requestDto.phone,
    );
    if (!isExist) throw new HttpException('CONFLICT', HttpStatus.CONFLICT);
  }

  @Post('signup')
  createUser(@Body() requestDto: SignupRequestDto): Promise<UserResponseDto> {
    return this.signupService.saveUser(requestDto);
  }

  @Post('login')
  login(@Body() requestDto: LoginRequestDto) {
    return this.loginService.loginByEmail(
      requestDto.email,
      requestDto.password,
    );
  }

  @Patch('logout/:id')
  logout(@Param() param): Promise<number> {
    return this.logoutService.logout(param.id);
  }

  @Post('find/email')
  findEmail(@Body() requestDto: PhoneRequestDto): Promise<string> {
    return this.findEmailService.findEmail(requestDto.phone);
  }

  @Post('find/password')
  async findPassword(@Body() requestDto: EmailRequestDto): Promise<void> {
    // TODO: 이메일 콘텐츠에는 무엇이 포함되어 있는지? 비밀번호 재설정이 맞는지.
    await this.findPasswordService.findUserPassword(requestDto.email);
  }

  @Get('verify/:token')
  async verifyToken(@Param() param): Promise<string> {
    return await this.findPasswordService.emailFindByChangePassVerifyToken(
      param.token,
    );
  }

  @Patch('change/password')
  async changePassword(@Body() requestDto: LoginRequestDto): Promise<number> {
    return await this.findPasswordService.changeUserPassword(
      requestDto.email,
      requestDto.password,
    );
  }

  @Post('verify/refresh-token')
  getNewAccessToken(
    @Body() requestDto: RefreshTokenRequestDto,
  ): Promise<ReissueAccessTokenResponseDto> {
    return this.refreshTokenService.reissueAccessToken(
      requestDto._id,
      requestDto.refreshToken,
    );
  }

  @UseGuards(AuthGuard)
  @Get('userinfo')
  async getUserInfo(
    @Query('userId') userId: string,
  ): Promise<UserInfoResponseDto> {
    return await this.userInfoService.getUserInfo(userId);
  }

  @UseGuards(AuthGuard)
  @Patch('studyDate')
  async addUserStudy(@Body() requestDto: UserIdRequestDto): Promise<number> {
    return await this.userInfoService.addUserStudyDate(requestDto.userId);
  }

  @UseGuards(AuthGuard)
  @Get('myLike')
  async getMyLikeAnswer(
    @Query('userId') userId: string,
    @Query('category') category: string,
  ): Promise<LikePracticeResponseDto[]> {
    return this.myLikeService.getMyLikeAnswer(userId, category);
  }

  @Delete('delete')
  async removeUserInfo(@Body() requestDto: UserIdRequestDto): Promise<void> {
    await this.removeUserService.removeUserInfo(requestDto.userId);
  }
}
