export class Survey {
  constructor(
    public _id: string,
    public userId: string,
    public grade: number,
    public comment: string,
    public subComment: string,
  ) {}
}
