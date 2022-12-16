import { Inject, Injectable } from '@nestjs/common';
import { PracticeRepositoryToken } from '../../practice/repository/persistence';
import { PracticeRepository } from '../../practice/repository/PracticeRepository';
import { LikePracticeResponseDto } from '../controller/dto/response/LikePracticeResponseDto';
import { LikeAnswerResponseDto } from '../controller/dto/response/LikeAnswerResponseDto';

export const MyLikeServiceToken = 'MyLikeServiceToken';

@Injectable()
export class MyLikeService {
  constructor(
    @Inject(PracticeRepositoryToken)
    private readonly practiceRepository: PracticeRepository,
  ) {}

  async getMyLikeAnswer(
    userId: string,
    category: string,
  ): Promise<LikePracticeResponseDto[]> {
    const questions =
      await this.practiceRepository.findMyLikeByUserIdAndCategory(
        userId,
        category,
      );

    const response = questions.map(
      (value) =>
        new LikePracticeResponseDto(
          value._id,
          value.title,
          value.order,
          value.answers
            .filter(
              (entity) =>
                entity.likes.filter((e) => String(e.userId) === userId)
                  .length !== 0,
            )
            .map((e) => new LikeAnswerResponseDto(e.author, e.description)),
        ),
    );

    let totalAnswerCount = 0;
    response.forEach((e) => (totalAnswerCount += e.answers.length));
    response[0]['totalAnswerCount'] = totalAnswerCount;

    return response;
  }
}
