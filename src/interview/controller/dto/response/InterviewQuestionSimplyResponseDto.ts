export class InterviewQuestionSimplyResponseDto {
  readonly practiceId: string;
  readonly questionTitle: string;
  readonly answer: string;

  constructor(practiceId: string, questionTitle: string, answer: string) {
    this.practiceId = practiceId;
    this.questionTitle = questionTitle;
    this.answer = answer;
  }
}
