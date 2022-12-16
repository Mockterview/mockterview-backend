export class MyInterviewResponseDto {
  readonly interviewId: string;
  readonly round: number;
  readonly score: number;
  readonly createdAt: string;

  constructor(
    interviewId: string,
    round: number,
    score: number,
    createdAt: Date,
  ) {
    this.interviewId = interviewId;
    this.round = round;
    this.score = score;
    this.createdAt = `${createdAt.getFullYear()}.${(
      '00' +
      (createdAt.getMonth() + 1)
    ).slice(-2)}.${('00' + createdAt.getDate()).slice(-2)}`;
  }
}
