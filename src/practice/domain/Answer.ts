import { Like } from './Like';

export class Answer {
  constructor(
    public author: string,
    public name: string,
    public description: string,
    public likes: Array<Like>,
    public createdAt: Date,
  ) {}
}
