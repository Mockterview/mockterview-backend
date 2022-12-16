import { Answer } from './Answer';

export class Practice {
  constructor(
    public _id: string,
    public title: string,
    public order: number,
    public level: string,
    public category: string,
    public answers: Answer[],
    public code: string,
  ) {}
}
