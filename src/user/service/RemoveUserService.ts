import { Inject, Injectable } from '@nestjs/common';
import { PracticeRepositoryToken } from '../../practice/repository/persistence';
import { PracticeRepository } from '../../practice/repository/PracticeRepository';
import { UserRepositoryToken } from '../repository/persistence';
import { UserRepository } from '../repository/UserRepository';
import { InterviewRepositoryToken } from '../../interview/repository/persistence';
import { InterviewRepository } from '../../interview/repository/InterviewRepository';

export const RemoveUserServiceToken = 'RemoveUserServiceToken';

@Injectable()
export class RemoveUserService {
  constructor(
    @Inject(PracticeRepositoryToken)
    private readonly practiceRepository: PracticeRepository,
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
    @Inject(InterviewRepositoryToken)
    private readonly interviewRepository: InterviewRepository,
  ) {}

  async removeUserInfo(userId: string): Promise<void> {
    /**
     *  1. Interview userId 삭제
     *  2. answers author 삭제
     *  3. answers likes userId 삭제
     *  4. users objectId 삭제
     */

    await this.interviewRepository.removeInterviewByUserId(userId);
    await this.practiceRepository.removeAnswer(userId);
    await this.practiceRepository.removeLikesUserId(userId);
    await this.userRepository.removeUser(userId);
  }
}
