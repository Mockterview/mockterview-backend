import { LikeAnswerResponseDto } from './LikeAnswerResponseDto';

export class LikePracticeResponseDto {
  readonly practiceId: string;
  readonly title: string;
  readonly order: number;
  readonly answers: LikeAnswerResponseDto[];

  constructor(
    practiceId: string,
    title: string,
    order: number,
    answers: LikeAnswerResponseDto[],
  ) {
    this.practiceId = practiceId;
    this.title = title;
    this.order = order;
    this.answers = answers;
  }
}
