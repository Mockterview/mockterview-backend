export class InterviewRoundResponseDto {
  readonly category: string;
  readonly round: number;
  readonly isCompleted: boolean;

  constructor(category: string, round: number, isCompleted: boolean) {
    this.category = category;
    this.round = round + 1;
    this.isCompleted = isCompleted;
  }
}
