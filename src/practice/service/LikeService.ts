import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PracticeRepositoryToken } from '../repository/persistence';
import { PracticeRepository } from '../repository/PracticeRepository';
import { LikeRequestDto } from '../controller/dto/request/LikeRequestDto';
import { BusinessException } from '../../exception';

export const LikeServiceToken = 'LikeServiceToken';

@Injectable()
export class LikeService {
  constructor(
    @Inject(PracticeRepositoryToken)
    private readonly practiceRepository: PracticeRepository,
  ) {}

  async findLikeUsers(requestDto: LikeRequestDto): Promise<number> {
    const result = await this.practiceRepository.findLikes(requestDto);

    const findMyLikes = result['answers'][0].likes.find(
      (e) => String(e.userId) === requestDto.myUserId,
    );

    return !!findMyLikes
      ? this.downLikes(requestDto)
      : this.upLikes(requestDto);
  }

  async upLikes(requestDto: LikeRequestDto): Promise<number> {
    const result = await this.practiceRepository.addLikeUsers(requestDto);

    if (result === 0) {
      throw new BusinessException(
        'practice',
        'like up update error',
        '잘못된 Id입니다!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.findLikes(requestDto);
  }

  async downLikes(requestDto: LikeRequestDto): Promise<number> {
    const result: number = await this.practiceRepository.removeLikeUsers(
      requestDto,
    );

    if (result === 0) {
      throw new BusinessException(
        'practice',
        'like down update error',
        '잘못된 Id입니다!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.findLikes(requestDto);
  }

  async findLikes(requestDto: LikeRequestDto): Promise<number> {
    const response = await this.practiceRepository.findLikes(requestDto);

    return response['answers'][0].likes.length;
  }
}
