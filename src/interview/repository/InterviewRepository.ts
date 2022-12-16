import { MyInterviewResponseDto } from '../controller/dto/response/MyInterviewResponseDto';
import { Interview } from '../domain/Interview';
import { InterviewAnswerRequestDto } from '../controller/dto/request/InterviewAnswerRequestDto';
import { InterviewScoreRequestDto } from '../controller/dto/request/InterviewScoreRequestDto';

export interface InterviewRepository {
  findRoundByUserIdAndCategory(
    userId: string,
    category: string,
  ): Promise<number>;

  findReportByUserIdAndCategory(
    userId: string,
    category: string,
  ): Promise<Array<MyInterviewResponseDto>>;

  save(interview: Interview): Promise<string>;

  updateAnswer(requestDto: InterviewAnswerRequestDto): Promise<number>;

  findInterviewResultByInterviewId(interviewId: string): Promise<Interview>;

  finishInterviewByInterviewId(interviewId: string): Promise<number>;

  updateCorrect(requestDto: InterviewScoreRequestDto): Promise<number>;

  findInterviewQuestionsByInterviewId(interviewId: string): Promise<Interview>;

  updateScore(interviewId: string, score: number): Promise<number>;

  findInterviewByUserIdAndCategory(
    userId: string,
    category: string,
  ): Promise<Interview[]>;

  findInterviewByUserId(userId: string): Promise<Interview[]>;

  removeInterviewByUserId(userId: string): Promise<void>;
}
