import { StudyDay } from './StudyDay';

export class User {
  constructor(
    public _id: string,
    public email: string,
    public name: string,
    public phone: string,
    public password: string,
    public refreshToken: string,
    public changePassVerifyToken: string,
    public studyDay: StudyDay[],
  ) {}
}
