import { Answer } from '../domain/Answer';
import { LikeRequestDto } from '../controller/dto/request/LikeRequestDto';
import { Practice } from '../domain/Practice';
import { AnswerRequestDto } from '../controller/dto/request/AnswerRequestDto';

export interface PracticeRepository {
  getDistinctCategory(): Promise<string[]>;

  findInterviewQuestionsByCategory(
    userId: string,
    category: string,
  ): Promise<Practice[]>;

  findPracticesHaveMyAnswersByUserIdAndCategory(
    userId: string,
    category: string,
  ): Promise<Practice[]>;

  findByCategory(category: string): Promise<Practice[]>;

  findByPracticeId(practiceId: string): Promise<Practice>;

  findByAnswersAuthor(dto: AnswerRequestDto): Promise<Practice> | null;

  createAnswer(dto: AnswerRequestDto): Promise<number>;

  updateAnswer(dto: AnswerRequestDto): Promise<number>;

  findLikes(dto: LikeRequestDto): Promise<Practice>;

  addLikeUsers(dto: LikeRequestDto): Promise<number>;

  removeLikeUsers(dto: LikeRequestDto): Promise<number>;

  findMyLikeByUserIdAndCategory(
    userId: string,
    category: string,
  ): Promise<Practice[]>;

  removeAnswer(userId: string): Promise<void>;

  removeLikesUserId(userId: string): Promise<void>;
}
