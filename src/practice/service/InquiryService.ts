import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PracticeRepositoryToken } from '../repository/persistence';
import { PracticeRepository } from '../repository/PracticeRepository';
import { CategoryResponseDto } from '../controller/dto/response/CategoryResponseDto';
import { Answer } from '../domain/Answer';
import { BusinessException } from '../../exception';
import { Practice } from '../domain/Practice';
import { yyyymmdd } from '../../utils/utils-time';
import { OtherUserResponseDto } from '../controller/dto/response/OtherUserResponseDto';

export const InquiryServiceToken = 'InquiryServiceToken';

export interface Completed {
  [x: string]: number;
}

@Injectable()
export class InquiryService {
  constructor(
    @Inject(PracticeRepositoryToken)
    private readonly practiceRepository: PracticeRepository,
  ) {}

  async getQuestions(
    category: string,
    userId: string,
  ): Promise<CategoryResponseDto[]> {
    const result = await this.practiceRepository.findByCategory(category);
    const response: CategoryResponseDto[] = [];

    result.forEach((value) => {
      const result = value.answers.find((e) => String(e.author) === userId);

      response.push(
        new CategoryResponseDto(
          value._id,
          value.title,
          value.order,
          value.level,
          result ? result : '',
          value.code,
        ),
      );
    });

    return response;
  }

  async getCompletedStack(userId: string): Promise<Completed> {
    const result = await this.practiceRepository.getDistinctCategory();

    const questions = await Promise.all(
      result.map((e) => this.practiceRepository.findByCategory(e)),
    );

    const completed = await Promise.all(
      questions.map((e) => this.findCompleted(userId, e)),
    );

    return result.reduce((accumulator, value, index) => {
      return { ...accumulator, [value]: completed[index] };
    }, {});
  }

  async getOtherUserAnswer(
    practiceId: string,
    userId: string,
    sort: string,
  ): Promise<OtherUserResponseDto> {
    const result = await this.practiceRepository.findByPracticeId(practiceId);
    const sortResult = this.sortByResult(sort, result.answers);

    let removeIdx: number;
    let myAnswer: Answer;

    Object.keys(sortResult).forEach((key) => {
      if (String(sortResult[key].author) === userId) {
        removeIdx = parseInt(key);
        myAnswer = sortResult[key];
      }

      const myLikeCheck = sortResult[key].likes.find(
        (e) => String(e.userId) === userId,
      );

      sortResult[key]['likeCheck'] = !!myLikeCheck;
      sortResult[key].createdAt = yyyymmdd(sortResult[key].createdAt);
    });

    sortResult.splice(removeIdx, 1);

    return new OtherUserResponseDto(
      practiceId,
      result.title,
      result.order,
      sortResult.length,
      sortResult,
      myAnswer,
    );
  }

  findCompleted(userId: string, category: Practice[]): number {
    let Count = 0;

    category.forEach((value) => {
      const findCompleted = value.answers.find(
        (e) => String(e.author) === userId,
      );

      if (findCompleted) Count += 1;
    });

    return Math.floor((Count / category.length) * 100);
  }

  sortByResult(sort: string, result: Answer[]): Answer[] {
    if (!['like', 'new'].includes(sort)) {
      throw new BusinessException(
        'practice',
        'sort name error',
        '잘못된 정렬이름 입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return sort === 'like'
      ? result.sort((a, b) => b.likes.length - a.likes.length)
      : result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}
