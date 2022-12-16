import { Inject, Injectable } from '@nestjs/common';
import { SurveyRepositoryToken } from '../repository/persistence';
import { SurveyRepository } from '../repository/SurveyRepository';
import { SurveyRequestDto } from '../controller/dto/request/SurveyRequestDto';
import { Survey } from '../domain/Survey';
import { ObjectID } from 'bson';

export const SurveyServiceToken = 'SurveyServiceToken';

@Injectable()
export class SurveyService {
  constructor(
    @Inject(SurveyRepositoryToken)
    private readonly surveyRepository: SurveyRepository,
  ) {}

  async saveSurvey(requestDto: SurveyRequestDto): Promise<string> {
    return this.surveyRepository.save(
      new Survey(
        new ObjectID().toHexString(),
        requestDto.userId,
        requestDto.grade,
        requestDto.comment,
        requestDto.subComment,
      ),
    );
  }
}
