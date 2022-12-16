import { forwardRef, Logger, Module } from '@nestjs/common';
import configuration from '../config/configuration';
import { MessengerModule } from './messenger/messenger.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PracticeModule } from './practice/practice.module';
import { InterviewModule } from './interview/interview.module';
import { EventsModule } from './events/events.module';
import { WantModule } from './want/want.module';
import { LogModule } from './writeLog/log.module';
import { SurveyModule } from './survey/survey.module';

const {
  env,
  db: {
    mongo: { dbmockterview },
  },
} = configuration();

console.log(env);
console.log(dbmockterview.uri);

@Module({
  imports: [
    EventsModule,
    MessengerModule,
    AuthModule,
    WantModule,
    LogModule,
    UserModule,
    PracticeModule,
    InterviewModule,
    SurveyModule,
    MongooseModule.forRoot(dbmockterview.uri, {
      connectionName: 'dbmockterview',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
