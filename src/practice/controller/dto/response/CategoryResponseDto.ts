import { Answer } from '../../../domain/Answer';

export class CategoryResponseDto {
  readonly _id: string;
  readonly title: string;
  readonly order: number;
  readonly level: string;
  readonly answers: Answer | string;
  readonly code: string;

  constructor(
    _id: string,
    title: string,
    order: number,
    level: string,
    answers: Answer | string,
    code: string,
  ) {
    this._id = _id;
    this.title = title;
    this.order = order;
    this.level = level;
    this.answers = answers;
    this.code = code ? code : '';
  }
}
