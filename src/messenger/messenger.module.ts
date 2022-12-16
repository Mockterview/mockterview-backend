import { Logger, Module } from '@nestjs/common';
import {
  CancelMessageServiceProvider,
  MessageSenderProvider,
  SendMessageServiceProvider,
} from './messenger.provider';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [
    Logger,
    MessageSenderProvider,
    SendMessageServiceProvider,
    CancelMessageServiceProvider,
  ],
  exports: [
    MessageSenderProvider,
    SendMessageServiceProvider,
    CancelMessageServiceProvider,
  ],
})
export class MessengerModule {}
