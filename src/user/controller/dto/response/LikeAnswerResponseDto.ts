export class LikeAnswerResponseDto {
  readonly author: string;
  readonly description: string;

  constructor(author: string, description: string) {
    this.author = author;
    this.description = description;
  }
}
