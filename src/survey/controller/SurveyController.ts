import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { SurveyService, SurveyServiceToken } from '../service/SurveyService';
import { SurveyRequestDto } from './dto/request/SurveyRequestDto';

@UseGuards(AuthGuard)
@Controller('surveys')
export class SurveyController {
  constructor(
    @Inject(SurveyServiceToken)
    private readonly surveyService: SurveyService,
  ) {}

  @Post('submit')
  async submitSurvey(@Body() requestDto: SurveyRequestDto): Promise<string> {
    console.log('subComment : ', requestDto.subComment);
    return this.surveyService.saveSurvey(requestDto);
  }
}
