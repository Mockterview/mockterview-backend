import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { logSchema } from './log.schema';
import { LogRepositoryProvider, LogServiceProvider } from './log.provides';
import { LogController } from './controller/LogController';

@Module({
  imports: [MongooseModule.forFeature([logSchema], 'dbmockterview')],
  controllers: [LogController],
  providers: [LogRepositoryProvider, LogServiceProvider],
})
export class LogModule {}
