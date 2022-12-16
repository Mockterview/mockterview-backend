import { Answer } from '../../../domain/Answer';

export class OtherUserResponseDto {
  readonly practiceId: string;
  readonly title: string;
  readonly order: number;
  readonly answerCount: number;
  readonly answers: Answer[];
  readonly myAnswer: Answer;

  constructor(
    practiceId: string,
    title: string,
    order: number,
    answerCount: number,
    answers: Answer[],
    myAnswer: Answer,
  ) {
    this.practiceId = practiceId;
    this.title = title;
    this.order = order;
    this.answerCount = answerCount;
    this.answers = answers;
    this.myAnswer = myAnswer;
  }
}
