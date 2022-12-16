import { IMessageSender } from '../../../application/port/out/message-sender/IMessageSender';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { BusinessException } from '../../../../exception';
import { firstValueFrom } from 'rxjs';
import configuration from '../../../../../config/configuration';

export const MessageSenderToken = 'MessageSenderToken';

@Injectable()
export class MessageSender implements IMessageSender {
  private baseUrl = 'https://ampq.spartacodingclub.kr/';
  private headers = {
    'Content-type': 'application/json',
    'x-sparta-iam-access-key': 'DhhJRJMEIIGnAxeQnVBB',
  };

  constructor(
    private readonly logger: Logger,
    private readonly httpService: HttpService,
  ) {}

  sendAlimtalk(
    templateCode: string,
    userId: string,
    tagData: { [key: string]: string },
    channelId: string,
  ): Promise<number> {
    const url = this.baseUrl + 'alimtalk';
    const data = {
      template_code: templateCode,
      user_id: userId,
      tag_data: tagData,
      channel_id: channelId,
      time_data: null,
    };
    return this.send(url, data);
  }

  sendSlack(
    workspaceUrl: string,
    channel: string,
    text: string,
  ): Promise<number> {
    const url = this.baseUrl + 'slack';
    const data = {
      url: workspaceUrl,
      channel,
      text,
    };
    return this.send(url, data);
  }

  sendSms(
    phone: string,
    subject: string,
    msg: string,
    timeToBeDelivered: string | null,
  ): Promise<number> {
    const url = this.baseUrl + 'sms';
    const data = {
      phone,
      subject,
      msg,
      time_to_be_delivered: timeToBeDelivered,
    };
    return this.send(url, data);
  }

  sendMail(
    title: string,
    htmlContent: string,
    receiver: string,
    author: string,
    password: string,
  ): Promise<number> {
    throw new BusinessException(
      'messenger',
      'Not implemented error',
      'Not implemented error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  private send(
    url: string,
    data: { [key: string]: string | { [key: string]: string } },
  ): Promise<number> {
    const { env } = configuration();
    console.log(`env?: ${env}`);
    // if (env !== 'prod') return Promise.resolve(HttpStatus.ACCEPTED);
    return firstValueFrom(
      this.httpService.post(url, data, { headers: this.headers }).pipe(
        map((res) => res.status),
        catchError((e) => {
          let message = `failed to call [${url}]`;
          if (e.response) {
            message += `\t${e.response.status}\t${e.response.data}\t${data}`;
          } else if (e.request) {
            message += `\t${e.request}`;
          } else {
            message += `\t${e.message}`;
          }
          throw new BusinessException(
            'messenger',
            message,
            message,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      ),
    );
  }
}
