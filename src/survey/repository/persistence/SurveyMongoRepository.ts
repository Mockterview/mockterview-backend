import { Inject, Injectable } from '@nestjs/common';
import { SurveyRepository } from '../SurveyRepository';
import { InjectModel } from '@nestjs/mongoose';
import { SurveyMongoDocument, SurveyMongoEntity } from './SurveyMongoEntity';
import { Model } from 'mongoose';
import { SurveyMapperToken, SurveyMongoMapper } from './SurveyMongoMapper';
import { Survey } from '../../domain/Survey';
import { ObjectID } from 'bson';

export const SurveyRepositoryToken = 'SurveyRepositoryToken';

@Injectable()
export class SurveyMongoRepository implements SurveyRepository {
  constructor(
    @InjectModel(SurveyMongoEntity.name)
    private surveyModel: Model<SurveyMongoDocument>,
    @Inject(SurveyMapperToken)
    private surveyMapper: SurveyMongoMapper,
  ) {}

  async save(survey: Survey): Promise<string> {
    const savedSurvey = await this.surveyModel.create({
      _id: new ObjectID(survey._id),
      userId: new ObjectID(survey.userId),
      grade: survey.grade,
      comment: survey.comment,
      subComment: survey.subComment,
    });
    return savedSurvey._id.toString();
  }
}
