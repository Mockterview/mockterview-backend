export class InterviewAnswerRequestDto {
  readonly interviewId: string;
  readonly practiceId: string;
  readonly audioUrl: string;

  constructor(interviewId: string, practiceId: string, audioUrl: string) {
    this.interviewId = interviewId;
    this.practiceId = practiceId;
    this.audioUrl = audioUrl;
  }
}
