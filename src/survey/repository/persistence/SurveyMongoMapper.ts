import { Injectable } from '@nestjs/common';
import { Survey } from '../../domain/Survey';
import { SurveyMongoEntity } from './SurveyMongoEntity';

export const SurveyMapperToken = 'SurveyMapperToken';

@Injectable()
export class SurveyMongoMapper {
  mapEntityToDomain(survey: SurveyMongoEntity) {
    return new Survey(
      survey._id.toHexString(),
      survey.userId.toHexString(),
      survey.grade,
      survey.comment,
      survey.subComment,
    );
  }
}
