import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PracticeRepositoryToken } from '../repository/persistence';
import { PracticeRepository } from '../repository/PracticeRepository';
import { AnswerRequestDto } from '../controller/dto/request/AnswerRequestDto';
import { BusinessException } from '../../exception';
import { AnswerResponseDto } from '../controller/dto/response/AnswerResponseDto';
import { Practice } from '../domain/Practice';

export const SubmissionServiceToken = 'SubmissionServiceToken';

@Injectable()
export class SubmissionService {
  constructor(
    @Inject(PracticeRepositoryToken)
    private readonly practiceRepository: PracticeRepository,
  ) {}

  async createAndModify(dto: AnswerRequestDto): Promise<AnswerResponseDto> {
    const check = await this.practiceRepository.findByAnswersAuthor(dto);
    let modifiedCount: number;
    let answeredQuestion: Array<Practice> | null;

    if (check) {
      modifiedCount = await this.updateAnswer(dto);
    } else {
      modifiedCount = await this.createAnswer(dto);
      answeredQuestion =
        await this.practiceRepository.findPracticesHaveMyAnswersByUserIdAndCategory(
          dto.author,
          dto.category,
        );
    }

    if (!modifiedCount) {
      throw new BusinessException(
        'practice',
        'createAndModify answer error',
        '해당 데이터가 잘못되어 변경할 값을 찾지 못했습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return new AnswerResponseDto(
      modifiedCount,
      answeredQuestion ? answeredQuestion.length : null,
    );
  }

  async createAnswer(dto: AnswerRequestDto): Promise<number> {
    return await this.practiceRepository.createAnswer(dto);
  }

  async updateAnswer(dto: AnswerRequestDto): Promise<number> {
    return await this.practiceRepository.updateAnswer(dto);
  }
}
