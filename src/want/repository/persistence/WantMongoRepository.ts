import { WantRepository } from '../WantRepository';
import { InjectModel } from '@nestjs/mongoose';
import { WantMongoDocument, WantMongoEntity } from './WantMongoEntity';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Want } from '../../domain/Want';
import { ObjectID } from 'bson';

export const WantRepositoryToken = 'WantRepositoryToken';

@Injectable()
export class WantMongoRepository implements WantRepository {
  constructor(
    @InjectModel(WantMongoEntity.name)
    private wantModel: Model<WantMongoDocument>,
  ) {}

  async findWantByPageName(pageName: string): Promise<Want> {
    return this.wantModel.findOne({ pageName: pageName });
  }

  async createWantByPageName(pageName: string): Promise<Want> {
    await this.wantModel.create({
      _id: new ObjectID(),
      pageName: pageName,
      wantCount: 1,
    });
    return this.wantModel.findOne({ pageName: pageName });
  }

  async updateWantByPageName(
    pageName: string,
    wantCount: number,
  ): Promise<Want> {
    const response = await this.wantModel.updateOne(
      { pageName: pageName },
      { wantCount: wantCount + 1 },
    );
    return this.wantModel.findOne({ pageName: pageName });
  }
}
