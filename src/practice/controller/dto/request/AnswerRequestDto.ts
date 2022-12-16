export class AnswerRequestDto {
  readonly practiceId: string;
  readonly author: string;
  readonly name: string;
  readonly category: string;
  readonly description: string;

  constructor(
    practiceId: string,
    author: string,
    name: string,
    category: string,
    description: string,
  ) {
    this.practiceId = practiceId;
    this.author = author;
    this.name = name;
    this.category = category;
    this.description = description;
  }
}
