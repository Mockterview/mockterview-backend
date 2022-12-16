export class InterviewScoreRequestDto {
  readonly interviewId: string;
  readonly practiceId: string;
  readonly correct: boolean;

  constructor(interviewId: string, practiceIdId: string, correct: boolean) {
    this.interviewId = interviewId;
    this.practiceId = practiceIdId;
    this.correct = correct;
  }
}
