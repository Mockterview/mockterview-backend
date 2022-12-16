import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { ObjectID } from 'bson';
import { InterviewRepository } from '../InterviewRepository';
import {
  InterviewMongoDocument,
  InterviewMongoEntity,
} from './InterviewMongoEntity';
import {
  InterviewMapperToken,
  InterviewMongoMapper,
} from './InterviewMongoMapper';
import { MyInterviewResponseDto } from '../../controller/dto/response/MyInterviewResponseDto';
import { Interview } from '../../domain/Interview';
import { InterviewAnswerRequestDto } from '../../controller/dto/request/InterviewAnswerRequestDto';
import { InterviewScoreRequestDto } from '../../controller/dto/request/InterviewScoreRequestDto';

export const InterviewRepositoryToken = 'InterviewRepositoryToken';

@Injectable()
export class InterviewMongoRepository implements InterviewRepository {
  constructor(
    @InjectModel(InterviewMongoEntity.name)
    private interviewModel: Model<InterviewMongoDocument>,
    @Inject(InterviewMapperToken)
    private interviewMapper: InterviewMongoMapper,
  ) {}

  async findRoundByUserIdAndCategory(
    userId: string,
    category: string,
  ): Promise<number> {
    return this.interviewModel.count({
      userId: new ObjectID(userId),
      category: category,
      isCompleted: true,
    });
  }

  async findReportByUserIdAndCategory(
    userId: string,
    category: string,
  ): Promise<Array<MyInterviewResponseDto>> {
    const myInterviews: Array<MyInterviewResponseDto> = [];
    const interviews = await this.interviewModel.find(
      {
        userId: new ObjectID(userId),
        category: category,
        isCompleted: true,
      },
      { interviewId: 1, round: 1, score: 1, createdAt: 1 },
    );
    interviews.forEach((interview) => {
      myInterviews.push(
        new MyInterviewResponseDto(
          interview._id.toString(),
          interview.round,
          interview.score,
          interview.createdAt,
        ),
      );
    });
    return myInterviews;
  }

  async save(interview: Interview): Promise<string> {
    const entity = await this.interviewModel.create({
      _id: new ObjectID(interview._id),
      userId: new ObjectID(interview.userId),
      category: interview.category,
      round: interview.round,
      score: interview.score,
      questions: interview.questions,
      isCompleted: interview.isCompleted,
    });
    return this.interviewMapper.mapEntityToDomain(entity)._id;
  }

  async updateAnswer(requestDto: InterviewAnswerRequestDto): Promise<number> {
    const response = await this.interviewModel.updateOne(
      {
        _id: new ObjectID(requestDto.interviewId),
        'questions.practiceId': new ObjectID(requestDto.practiceId),
      },
      { $set: { 'questions.$.audioUrl': requestDto.audioUrl } },
    );
    return response.modifiedCount;
  }

  async findInterviewResultByInterviewId(
    interviewId: string,
  ): Promise<Interview> {
    const entity = await this.interviewModel.findOne({
      _id: new ObjectID(interviewId),
    });
    return this.interviewMapper.mapEntityToDomain(entity);
  }

  async finishInterviewByInterviewId(interviewId: string): Promise<number> {
    const response = await this.interviewModel.updateOne(
      {
        _id: new ObjectID(interviewId),
      },
      { $set: { isCompleted: true } },
    );
    return response.modifiedCount;
  }

  async updateCorrect(requestDto: InterviewScoreRequestDto): Promise<number> {
    const response = await this.interviewModel.updateOne(
      {
        _id: new ObjectID(requestDto.interviewId),
        'questions.practiceId': new ObjectID(requestDto.practiceId),
      },
      { $set: { 'questions.$.correct': requestDto.correct } },
    );
    return response.modifiedCount;
  }

  async findInterviewQuestionsByInterviewId(
    interviewId: string,
  ): Promise<Interview> {
    return this.interviewModel.findOne(
      {
        _id: new ObjectID(interviewId),
      },
      {
        questions: 1,
      },
    );
    // return this.interviewMapper.mapEntityToDomain(entity);
  }

  async updateScore(interviewId: string, score: number): Promise<number> {
    const response = await this.interviewModel.updateOne(
      {
        _id: new ObjectID(interviewId),
      },
      {
        $set: { score: score },
      },
    );
    return response.modifiedCount;
  }

  async findInterviewByUserIdAndCategory(
    userId: string,
    category: string,
  ): Promise<Interview[]> {
    return this.interviewModel.find(
      {
        userId: new ObjectID(userId),
        category: category,
        isCompleted: true,
      },
      {
        _id: 0,
        questions: 1,
        round: 1,
      },
    );
  }

  async findInterviewByUserId(userId: string): Promise<Interview[]> {
    const entities = await this.interviewModel.find({
      userId: new ObjectID(userId),
      isCompleted: true,
    });
    return entities.map((entity) =>
      this.interviewMapper.mapEntityToDomain(entity),
    );
  }

  async removeInterviewByUserId(userId: string): Promise<void> {
    await this.interviewModel.deleteMany({
      userId: new ObjectID(userId),
    });
  }
}
