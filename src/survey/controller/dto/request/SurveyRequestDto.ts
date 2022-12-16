export class SurveyRequestDto {
  readonly userId: string;
  readonly grade: number;
  readonly comment: string;
  readonly subComment: string;

  constructor(
    userId: string,
    grade: number,
    comment: string,
    subComment: string,
  ) {
    this.userId = userId;
    this.grade = grade;
    this.comment = comment;
    this.subComment = subComment;
  }
}
