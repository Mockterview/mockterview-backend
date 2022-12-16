import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  InterviewInquiryService,
  InterviewInquiryServiceToken,
} from '../service/InterviewInquiryService';
import {
  InterviewSubmissionService,
  InterviewSubmissionServiceToken,
} from '../service/InterviewSubmissionService';
import { InterviewCategoryResponseDto } from './dto/response/InterviewCategoryResponseDto';
import { InterviewResponseDto } from './dto/response/InterviewResponseDto';
import { InterviewAnswerRequestDto } from './dto/request/InterviewAnswerRequestDto';
import {
  GetInterviewService,
  GetInterviewServiceToken,
} from '../service/GetInterviewService';
import { InterviewScoreRequestDto } from './dto/request/InterviewScoreRequestDto';
import { InterviewQuestionSimplyResponseDto } from './dto/response/InterviewQuestionSimplyResponseDto';
import { AuthGuard } from '../../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('interviews')
export class InterviewController {
  constructor(
    @Inject(InterviewInquiryServiceToken)
    private readonly interviewInquiryService: InterviewInquiryService,
    @Inject(InterviewSubmissionServiceToken)
    private readonly interviewSubmissionService: InterviewSubmissionService,
    @Inject(GetInterviewServiceToken)
    private readonly getInterviewService: GetInterviewService,
  ) {}

  @Get('categories')
  async getCategories(
    @Query('userId') userId: string,
  ): Promise<InterviewCategoryResponseDto> {
    const rounds = await this.interviewInquiryService.getRoundsByUserId(userId);
    const reports = await this.interviewInquiryService.getReportsByUserId(
      userId,
    );
    return new InterviewCategoryResponseDto(rounds, reports);
  }

  @Get('questions')
  async getQuestions(
    @Query('userId') userId: string,
    @Query('category') category: string,
  ): Promise<InterviewResponseDto> {
    return this.interviewInquiryService.getQuestionsByCategory(
      userId,
      category,
    );
  }

  @Patch('answers/submit')
  submitAnswer(@Body() requestDto: InterviewAnswerRequestDto): Promise<number> {
    return this.interviewSubmissionService.submitInterviewAnswer(requestDto);
  }

  @Get('result')
  async getInterview(
    @Query('interviewId') interviewId: string,
  ): Promise<InterviewResponseDto> {
    return this.getInterviewService.getInterviewResultByInterviewId(
      interviewId,
    );
  }

  @Patch('answers/score')
  async updateCorrect(
    @Body() requestDto: InterviewScoreRequestDto,
  ): Promise<number> {
    console.log(typeof requestDto.correct);
    return this.interviewInquiryService.updateCorrect(requestDto);
  }

  @Patch('answers/score/submit')
  async updateScore(@Body('interviewId') interviewId: string): Promise<number> {
    return this.interviewInquiryService.finishInterviewByInterviewId(
      interviewId,
    );
  }

  @Get('answers/wrong')
  async getWrongQuestions(
    @Query('userId') userId: string,
    @Query('category') category: string,
  ): Promise<InterviewQuestionSimplyResponseDto[]> {
    return this.getInterviewService.getWrongAnswerQuestionsByUserIdAndCategory(
      userId,
      category,
    );
  }
}
