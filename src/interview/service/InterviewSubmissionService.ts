import { Inject, Injectable } from '@nestjs/common';
import { InterviewRepositoryToken } from '../repository/persistence';
import { InterviewRepository } from '../repository/InterviewRepository';
import { InterviewAnswerRequestDto } from '../controller/dto/request/InterviewAnswerRequestDto';

export const InterviewSubmissionServiceToken =
  'InterviewSubmissionServiceToken';

@Injectable()
export class InterviewSubmissionService {
  constructor(
    @Inject(InterviewRepositoryToken)
    private readonly interviewRepository: InterviewRepository,
  ) {}

  async submitInterviewAnswer(
    requestDto: InterviewAnswerRequestDto,
  ): Promise<number> {
    return await this.interviewRepository.updateAnswer(requestDto);
  }
}
