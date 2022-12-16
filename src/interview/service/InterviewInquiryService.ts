import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InterviewRepositoryToken } from '../repository/persistence';
import { InterviewRepository } from '../repository/InterviewRepository';
import { InterviewRoundResponseDto } from '../controller/dto/response/InterviewRoundResponseDto';
import { PracticeRepository } from '../../practice/repository/PracticeRepository';
import { PracticeRepositoryToken } from '../../practice/repository/persistence';
import { InterviewReportResponseDto } from '../controller/dto/response/InterviewReportResponseDto';
import { InterviewQuestionResponseDto } from '../controller/dto/response/InterviewQuestionResponseDto';
import { Interview } from '../domain/Interview';
import { ObjectID } from 'bson';
import { InterviewResponseDto } from '../controller/dto/response/InterviewResponseDto';
import { InterviewScoreRequestDto } from '../controller/dto/request/InterviewScoreRequestDto';
import { BusinessException } from '../../exception';

export const InterviewInquiryServiceToken = 'InterviewInquiryServiceToken';

@Injectable()
export class InterviewInquiryService {
  constructor(
    @Inject(InterviewRepositoryToken)
    private readonly interviewRepository: InterviewRepository,
    @Inject(PracticeRepositoryToken)
    private readonly practiceRepository: PracticeRepository,
  ) {}

  async getRoundsByUserId(
    userId: string,
  ): Promise<Array<InterviewRoundResponseDto>> {
    const categories = await this.practiceRepository.getDistinctCategory();
    const item = categories.splice(0, 1);
    categories.splice(1, 0, item[0]);

    const rounds: Array<InterviewRoundResponseDto> = [];
    for (const category of categories) {
      rounds.push(
        new InterviewRoundResponseDto(
          category,
          await this.interviewRepository.findRoundByUserIdAndCategory(
            userId,
            category,
          ),
          await this.isCompletedByUserId(userId, category),
        ),
      );
    }
    return rounds;
  }

  async isCompletedByUserId(
    userId: string,
    category: string,
  ): Promise<boolean> {
    const practices =
      await this.practiceRepository.findPracticesHaveMyAnswersByUserIdAndCategory(
        userId,
        category,
      );
    return practices.length >= 10;
  }

  async getReportsByUserId(
    userId: string,
  ): Promise<Array<InterviewReportResponseDto>> {
    const categories = await this.practiceRepository.getDistinctCategory();
    const reports: Array<InterviewReportResponseDto> = [];
    for (const category of categories) {
      const myInterviews =
        await this.interviewRepository.findReportByUserIdAndCategory(
          userId,
          category,
        );
      reports.push(new InterviewReportResponseDto(category, myInterviews));
    }
    return reports;
  }

  async getQuestionsByCategory(
    userId: string,
    category: string,
  ): Promise<InterviewResponseDto> {
    const questions =
      await this.practiceRepository.findInterviewQuestionsByCategory(
        userId,
        category,
      );
    const response: Array<InterviewQuestionResponseDto> = [];
    questions.forEach((question) => {
      const answer = question.answers.find(
        (answer) => String(answer.author) === userId,
      );
      response.push(
        new InterviewQuestionResponseDto(
          question._id,
          question.title,
          answer.description,
          '',
          null,
        ),
      );
    });
    const savedInterviewId = await this.createInterview(
      userId,
      category,
      response,
    );
    return new InterviewResponseDto(savedInterviewId, 0, response);
  }

  async createInterview(
    userId: string,
    category: string,
    questions: Array<InterviewQuestionResponseDto>,
  ): Promise<string> {
    return await this.interviewRepository.save(
      new Interview(
        new ObjectID().toHexString(),
        userId,
        category,
        (await this.interviewRepository.findRoundByUserIdAndCategory(
          userId,
          category,
        )) + 1,
        0,
        questions,
        false,
      ),
    );
  }

  async updateCorrect(requestDto: InterviewScoreRequestDto): Promise<number> {
    return this.interviewRepository.updateCorrect(requestDto);
  }

  async updateScore(interview: Interview): Promise<number> {
    const score = interview.questions.filter(
      (question) => question.correct === true,
    ).length;
    return this.interviewRepository.updateScore(interview._id, score);
  }

  async updateCompleted(interview: Interview): Promise<number> {
    const correctCount = interview.questions.filter(
      (question) => question.correct === null,
    ).length;
    if (correctCount !== 0) {
      throw new BusinessException(
        'interview',
        '문제를 모두 풀지 않았습니다.',
        '문제를 모두 풀지 않았습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.interviewRepository.finishInterviewByInterviewId(interview._id);
  }

  async finishInterviewByInterviewId(interviewId: string): Promise<number> {
    const interview =
      await this.interviewRepository.findInterviewQuestionsByInterviewId(
        interviewId,
      );
    const updateScore = await this.updateScore(interview);
    const updateCompleted = await this.updateCompleted(interview);
    if (updateScore === 0 || updateCompleted === 0) {
      throw new BusinessException(
        'interview',
        'score 또는 completed가 변경 되지 않았습니다.',
        'score 또는 completed가 변경 되지 않았습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return updateCompleted;
  }
}
