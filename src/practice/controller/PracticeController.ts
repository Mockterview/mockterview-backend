import {
  Body,
  Controller,
  Get,
  Query,
  Inject,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  Completed,
  InquiryService,
  InquiryServiceToken,
} from '../service/InquiryService';
import { CategoryResponseDto } from './dto/response/CategoryResponseDto';
import {
  SubmissionService,
  SubmissionServiceToken,
} from '../service/SubmissionService';
import { LikeService, LikeServiceToken } from '../service/LikeService';
import { LikeRequestDto } from './dto/request/LikeRequestDto';
import { AuthGuard } from '../../auth/auth.guard';
import { OtherUserResponseDto } from './dto/response/OtherUserResponseDto';

@UseGuards(AuthGuard)
@Controller('practice')
export class PracticeController {
  constructor(
    @Inject(InquiryServiceToken)
    private readonly inquiryService: InquiryService,
    @Inject(SubmissionServiceToken)
    private readonly submissionService: SubmissionService,
    @Inject(LikeServiceToken)
    private readonly likeService: LikeService,
  ) {}

  @Get('questions')
  getCategories(
    @Query('category') category: string,
    @Query('userId') userId: string,
  ): Promise<CategoryResponseDto[]> {
    return this.inquiryService.getQuestions(category, userId);
  }

  @Get('categories')
  async getCompleted(@Query('userId') userId: string): Promise<Completed> {
    return this.inquiryService.getCompletedStack(userId);
  }

  @Get('answers/other')
  async getOtherUserAnswer(
    @Query('practiceId') practiceId: string,
    @Query('userId') userId: string,
    @Query('sort') sort: string,
  ): Promise<OtherUserResponseDto> {
    return this.inquiryService.getOtherUserAnswer(practiceId, userId, sort);
  }

  @Patch('answers/like')
  async updateAnswerLikes(@Body() requestDto: LikeRequestDto): Promise<number> {
    return this.likeService.findLikeUsers(requestDto);
  }
}
