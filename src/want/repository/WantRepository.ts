import { Want } from '../domain/Want';

export interface WantRepository {
  findWantByPageName(pageName: string): Promise<Want>;
  createWantByPageName(pageName: string): Promise<Want>;
  updateWantByPageName(pageName: string, wantCount: number): Promise<Want>;
}
