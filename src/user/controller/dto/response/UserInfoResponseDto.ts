import { InterviewInfo, UserInfo } from '../../../service/UserInfoService';

export class UserInfoResponseDto {
  readonly userInfo: UserInfo;
  readonly interviewInfo: InterviewInfo;

  constructor(userInfo: UserInfo, interviewInfo: InterviewInfo) {
    this.userInfo = userInfo;
    this.interviewInfo = interviewInfo;
  }
}
