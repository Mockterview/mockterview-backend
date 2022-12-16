import { InjectModel } from '@nestjs/mongoose';
import {
  PracticeMongoDocument,
  PracticeMongoEntity,
} from './PracticeMongoEntity';
import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { PracticeRepository } from '../PracticeRepository';
import {
  PracticeMapperToken,
  PracticeMongoMapper,
} from './PracticeMongoMapper';
import { LikeRequestDto } from 'src/practice/controller/dto/request/LikeRequestDto';
import { ObjectID } from 'bson';
import { Practice } from '../../domain/Practice';
import { AnswerRequestDto } from '../../controller/dto/request/AnswerRequestDto';
import { getCurrentDate } from '../../../utils/utils-time';

export const PracticeRepositoryToken = 'PracticeRepositoryToken';

@Injectable()
export class PracticeMongoRepository implements PracticeRepository {
  constructor(
    @InjectModel(PracticeMongoEntity.name)
    private practiceModel: Model<PracticeMongoDocument>,
    @Inject(PracticeMapperToken)
    private practiceMapper: PracticeMongoMapper,
  ) {}

  async getDistinctCategory(): Promise<string[]> {
    return this.practiceModel.distinct('category');
  }

  async findByCategory(category: string): Promise<Practice[]> {
    const entities = await this.practiceModel
      .find({ category })
      .sort({ order: 1 });
    return entities.map((entity) =>
      this.practiceMapper.mapEntityToDomain(entity),
    );
  }

  async findByPracticeId(practiceId: string): Promise<Practice> {
    const practice = await this.practiceModel.findOne({
      _id: new ObjectID(practiceId),
    });

    return this.practiceMapper.mapEntityToDomain(practice);
  }

  async removeLikeUsers(dto: LikeRequestDto): Promise<number> {
    const response = await this.practiceModel.updateOne(
      {
        _id: new ObjectID(dto.practiceId),
        'answers.author': new ObjectID(dto.userId),
      },
      {
        $pull: {
          'answers.$.likes': {
            userId: new ObjectID(dto.myUserId),
          },
        },
      },
    );

    return response.modifiedCount;
  }

  async addLikeUsers(dto: LikeRequestDto): Promise<number> {
    const response = await this.practiceModel.updateOne(
      {
        _id: new ObjectID(dto.practiceId),
        'answers.author': new ObjectID(dto.userId),
      },
      {
        $addToSet: {
          'answers.$.likes': {
            userId: new ObjectID(dto.myUserId),
          },
        },
      },
    );

    return response.modifiedCount;
  }

  async findLikes(dto: LikeRequestDto): Promise<Practice> {
    const entity = await this.practiceModel.findOne(
      {
        _id: new ObjectID(dto.practiceId),
      },
      {
        answers: {
          $elemMatch: { author: new ObjectID(dto.userId) },
        },
      },
    );

    return this.practiceMapper.mapEntityToDomain(entity);
  }

  async findByAnswersAuthor(dto: AnswerRequestDto): Promise<Practice> | null {
    const entity = await this.practiceModel.findOne({
      _id: new ObjectID(dto.practiceId),
      'answers.author': new ObjectID(dto.author),
    });

    return entity ? this.practiceMapper.mapEntityToDomain(entity) : null;
  }

  async createAnswer(dto: AnswerRequestDto): Promise<number> {
    const response = await this.practiceModel.updateOne(
      {
        _id: new ObjectID(dto.practiceId),
        'answers.author': { $ne: new ObjectID(dto.author) },
      },
      {
        $push: {
          answers: {
            author: new ObjectID(dto.author),
            name: dto.name,
            description: dto.description,
            likes: [],
            createdAt: new Date(getCurrentDate()),
          },
        },
      },
    );

    return response.modifiedCount;
  }

  async updateAnswer(dto: AnswerRequestDto): Promise<number> {
    const response = await this.practiceModel.updateOne(
      {
        _id: new ObjectID(dto.practiceId),
        'answers.author': new ObjectID(dto.author),
      },
      {
        $set: {
          'answers.$.description': dto.description,
        },
      },
    );

    return response.matchedCount;
  }

  async findPracticesHaveMyAnswersByUserIdAndCategory(
    userId: string,
    category: string,
  ): Promise<Practice[]> | null {
    const entities = await this.practiceModel.find({
      category: category,
      answers: {
        $elemMatch: { author: new ObjectID(userId) },
      },
    });
    return entities.map((entity) =>
      this.practiceMapper.mapEntityToDomain(entity),
    );
  }

  async findInterviewQuestionsByCategory(
    userId: string,
    category: string,
  ): Promise<Practice[]> | null {
    const entities = await this.practiceModel.aggregate([
      {
        $match: {
          category: category,
          'answers.author': new ObjectID(userId),
        },
      },
      { $sample: { size: 10 } },
    ]);
    return entities.map((entity) =>
      this.practiceMapper.mapEntityToDomain(entity),
    );
  }

  async findMyLikeByUserIdAndCategory(
    userId: string,
    category: string,
  ): Promise<Practice[]> {
    const entities = await this.practiceModel
      .find({
        category: category,
        'answers.likes.userId': new ObjectID(userId),
      })
      .sort({ order: 1 });

    return entities.map((entity) =>
      this.practiceMapper.mapEntityToDomain(entity),
    );
  }

  async removeAnswer(userId: string): Promise<void> {
    await this.practiceModel.updateMany(
      {},
      { $pull: { answers: { author: new ObjectID(userId) } } },
    );
  }

  async removeLikesUserId(userId: string): Promise<void> {
    await this.practiceModel.updateMany(
      {},
      {
        $pull: { 'answers.$[].likes': { userId: new ObjectID(userId) } },
      },
    );
  }
}
