import {
  SendMessageService,
  SendMessageServiceToken,
} from './application/service/send-message';
import {
  CancelMessageService,
  CancelMessageServiceToken,
} from './application/service/cancel-message/CancelMessageService';
import {
  MessageSender,
  MessageSenderToken,
} from './adapter/out/message-sender';

export const SendMessageServiceProvider = {
  provide: SendMessageServiceToken,
  useClass: SendMessageService,
};

export const CancelMessageServiceProvider = {
  provide: CancelMessageServiceToken,
  useClass: CancelMessageService,
};

export const MessageSenderProvider = {
  provide: MessageSenderToken,
  useClass: MessageSender,
};
