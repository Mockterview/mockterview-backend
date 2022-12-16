import { Inject, Injectable } from '@nestjs/common';
import { InterviewRepositoryToken } from '../repository/persistence';
import { InterviewRepository } from '../repository/InterviewRepository';
import { InterviewResponseDto } from '../controller/dto/response/InterviewResponseDto';
import { InterviewQuestionSimplyResponseDto } from '../controller/dto/response/InterviewQuestionSimplyResponseDto';

export const GetInterviewServiceToken = 'GetInterviewServiceToken';

@Injectable()
export class GetInterviewService {
  constructor(
    @Inject(InterviewRepositoryToken)
    private readonly interviewRepository: InterviewRepository,
  ) {}

  async getInterviewResultByInterviewId(
    interviewId: string,
  ): Promise<InterviewResponseDto> {
    const interview =
      await this.interviewRepository.findInterviewResultByInterviewId(
        interviewId,
      );
    return new InterviewResponseDto(
      interview._id,
      interview.score,
      interview.questions,
    );
  }

  async getWrongAnswerQuestionsByUserIdAndCategory(
    userId: string,
    category: string,
  ): Promise<InterviewQuestionSimplyResponseDto[]> {
    const interviews =
      await this.interviewRepository.findInterviewByUserIdAndCategory(
        userId,
        category,
      );

    const wrongAnswerQuestions: Array<InterviewQuestionSimplyResponseDto> = [];
    interviews.forEach((interview) => {
      interview.questions.map((question) => {
        if (
          !wrongAnswerQuestions
            .map((wrongAnswerQuestion) => wrongAnswerQuestion.practiceId)
            .includes(question.practiceId.toString()) &&
          question.correct === false
        ) {
          //
          wrongAnswerQuestions.push(
            new InterviewQuestionSimplyResponseDto(
              question.practiceId.toString(),
              question.questionTitle,
              question.answer,
            ),
          );
        }

        if (
          wrongAnswerQuestions
            .map((wrongAnswerQuestion) => wrongAnswerQuestion.practiceId)
            .includes(question.practiceId.toString()) &&
          question.correct === true
        ) {
          wrongAnswerQuestions.splice(
            wrongAnswerQuestions
              .map((wrongAnswerQuestion) => wrongAnswerQuestion.practiceId)
              .indexOf(question.practiceId.toString()),
            1,
          );
        }
      });
    });

    return wrongAnswerQuestions;
  }
}
