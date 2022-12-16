import { InterviewQuestionResponseDto } from './InterviewQuestionResponseDto';

export class InterviewResponseDto {
  readonly interviewId: string;
  readonly score: number;
  readonly questions: Array<InterviewQuestionResponseDto>;

  constructor(
    interviewId: string,
    score: number,
    questions: Array<InterviewQuestionResponseDto>,
  ) {
    this.interviewId = interviewId;
    this.score = score;
    this.questions = questions;
  }
}
