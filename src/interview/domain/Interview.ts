export class Interview {
  constructor(
    public _id: string,
    public userId: string,
    public category: string,
    public round: number,
    public score: number,
    public questions: Array<any>,
    public isCompleted: boolean,
  ) {}
}
