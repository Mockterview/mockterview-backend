import { LogRepository } from '../LogRepository';
import { InjectModel } from '@nestjs/mongoose';
import { LogMongoDocument, LogMongoEntity } from './LogMongoEntity';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { LogRequestDto } from '../../controller/dto/LogRequestDto';
import { ObjectID } from 'bson';

export const LogRepositoryToken = 'LogRepositoryToken';

@Injectable()
export class LogMongoRepository implements LogRepository {
  constructor(
    @InjectModel(LogMongoEntity.name)
    private logModel: Model<LogMongoDocument>,
  ) {}

  createLog(dto: LogRequestDto): void {
    this.logModel.create({
      _id: new ObjectID(),
      deviceId: dto.deviceId,
      pageName: dto.pageName,
      referrer: dto.referrer,
      agent: dto.agent,
      url: dto.url,
    });
  }
}
