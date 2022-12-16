export class AnswerResponseDto {
  readonly modifiedCount: number;
  readonly answeredCount: number | null;

  constructor(modifiedCount: number, answeredCount: number | null) {
    this.modifiedCount = modifiedCount;
    this.answeredCount = answeredCount;
  }
}
