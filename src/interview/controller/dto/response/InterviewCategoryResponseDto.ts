import { InterviewRoundResponseDto } from './InterviewRoundResponseDto';
import { InterviewReportResponseDto } from './InterviewReportResponseDto';

export class InterviewCategoryResponseDto {
  readonly rounds: Array<InterviewRoundResponseDto>;
  readonly reports: Array<InterviewReportResponseDto>;

  constructor(
    rounds: Array<InterviewRoundResponseDto>,
    reports: Array<InterviewReportResponseDto>,
  ) {
    this.rounds = rounds;
    this.reports = reports;
  }
}
