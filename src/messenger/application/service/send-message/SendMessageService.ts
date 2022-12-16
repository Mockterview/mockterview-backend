import { ISendMessage } from '../../port/in/send-message';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { MessageSenderToken } from '../../../adapter/out/message-sender';
import { IMessageSender } from '../../port/out/message-sender/IMessageSender';
import { BusinessException } from '../../../../exception';

export const SendMessageServiceToken = 'SendMessageServiceToken';

interface Dictionary<T> {
  [Key: string]: T;
}

@Injectable()
export class SendMessageService implements ISendMessage {
  constructor(
    @Inject(MessageSenderToken)
    private readonly messageSender: IMessageSender,
  ) {}

  sendAlimtalk(
    templateCode: string,
    userId: string,
    tagData: { [key: string]: string },
    channelId: string,
  ): Promise<number> {
    return this.messageSender.sendAlimtalk(
      templateCode,
      userId,
      tagData,
      channelId,
    );
  }

  sendEmail(title: string, content: string, receiver: string): Promise<number> {
    throw new BusinessException(
      'messenger',
      'Not implemented error',
      'Not implemented error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  sendSms(
    phone: string,
    subject: string,
    msg: string,
    timeToBeDelivered: string | null,
  ): Promise<number> {
    return this.messageSender.sendSms(phone, subject, msg, timeToBeDelivered);
  }

  sendSlack(channel: string, msgTitle: string, obj: object): Promise<number> {
    // teamsparta workspace url;
    const workspaceUrl =
      'https://hooks.slack.com/services/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';
    const jsonified = this.mapObjToJson(obj);
    const text = this.mapJsonToMsg(jsonified);
    return this.messageSender.sendSlack(workspaceUrl, channel, text);
  }

  private mapObjToJson(obj: object): Dictionary<any> {
    /**
     * 임의의 인스턴스를 JSON으로 변환한다.
     */
    return JSON.parse(JSON.stringify(obj));
  }

  private mapJsonToMsg(json: Dictionary<any>, prefix = ''): string {
    /**
     * JSON을 string 으로 (-[[key]]: value\n...) 변경한다.
     * Nested JSON일 경우 key.nestedkey: nestedvalue 와 같은 포맷이 된다.
     */
    return json
      ? Object.entries(json).reduce((acc, cur) => {
          if (typeof cur[1] === 'object') {
            return acc + this.mapJsonToMsg(cur[1], cur[0]);
          }
          acc += `-${prefix ? prefix + '.' : ''}${cur[0]}: ${cur[1]}\n`;
          return acc;
        }, '')
      : '';
  }
}
