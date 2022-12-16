import { Survey } from '../domain/Survey';

export interface SurveyRepository {
  save(survey: Survey): Promise<string>;
}
