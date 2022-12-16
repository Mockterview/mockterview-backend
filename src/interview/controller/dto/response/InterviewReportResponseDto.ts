import { MyInterviewResponseDto } from './MyInterviewResponseDto';

export class InterviewReportResponseDto {
  readonly category: string;
  readonly interviews: Array<MyInterviewResponseDto>;

  constructor(category: string, interviews: Array<MyInterviewResponseDto>) {
    this.category = category;
    this.interviews = interviews;
  }
}
