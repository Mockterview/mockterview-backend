import { Inject, Injectable } from '@nestjs/common';
import { WantRepositoryToken } from '../repository/persistence';
import { WantRepository } from '../repository/WantRepository';
import { Want } from '../domain/Want';

export const WantServiceToken = 'WantServiceToken';

@Injectable()
export class WantService {
  constructor(
    @Inject(WantRepositoryToken)
    private readonly wantRepository: WantRepository,
  ) {}

  async countWantByPageName(pageName: string): Promise<Want> {
    const want = await this.wantRepository.findWantByPageName(pageName);
    return want
      ? await this.wantRepository.updateWantByPageName(
          want.pageName,
          want.wantCount,
        )
      : await this.wantRepository.createWantByPageName(pageName);
  }
}
