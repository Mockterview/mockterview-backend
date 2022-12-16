import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRepositoryToken } from '../repository/persistence';
import { UserRepository } from '../repository/UserRepository';
import { BusinessException } from '../../exception';
import { InterviewRepositoryToken } from '../../interview/repository/persistence';
import { InterviewRepository } from '../../interview/repository/InterviewRepository';
import { getCurrentDate, yyyymmdd } from '../../utils/utils-time';
import { UserInfoResponseDto } from '../controller/dto/response/UserInfoResponseDto';

export const UserInfoServiceToken = 'UserInfoServiceToken';

export interface InterviewInfo {
  studyCount: number;
  stareCount: number;
  perfectCount: number;
}

export interface UserInfo {
  userId: string;
  name: string;
  email: string;
  phone: string;
}

@Injectable()
export class UserInfoService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
    @Inject(InterviewRepositoryToken)
    private readonly interviewRepository: InterviewRepository,
  ) {}

  async getUserInfo(userId: string): Promise<UserInfoResponseDto> {
    const resultUser = await this.userRepository.findById(userId);

    if (!resultUser) {
      throw new BusinessException(
        'user',
        'find userId request has wrong data',
        '검색된 회원이 없습니다!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const userInfo: UserInfo = {
      userId: resultUser._id,
      name: resultUser.name,
      email: resultUser.email,
      phone: resultUser.phone,
    };
    const day = yyyymmdd(getCurrentDate()).substring(0, 7);

    const studyCount = resultUser.studyDay.filter((value) =>
      value.day.includes(day),
    ).length;

    const resultInterview =
      await this.interviewRepository.findInterviewByUserId(userId);
    const perfect = resultInterview.filter(
      (interview) => interview.score === 10,
    ).length;
    const interviewInfo: InterviewInfo = {
      studyCount: studyCount,
      stareCount: resultInterview.length,
      perfectCount: perfect,
    };

    return new UserInfoResponseDto(userInfo, interviewInfo);
  }

  async addUserStudyDate(userId: string): Promise<number> {
    console.log(yyyymmdd(getCurrentDate()));
    return await this.userRepository.createUserStudyDay(
      userId,
      yyyymmdd(getCurrentDate()),
    );
  }
}
