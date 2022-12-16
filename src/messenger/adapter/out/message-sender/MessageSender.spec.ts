import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, Logger } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { IMessageSender } from '../../../application/port/out/message-sender/IMessageSender';
import { MessageSender, MessageSenderToken } from './MessageSender';

describe('발송 테스트', () => {
  let messageSender: IMessageSender;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        Logger,
        {
          provide: MessageSenderToken,
          useClass: MessageSender,
        },
      ],
    }).compile();

    messageSender = module.get<IMessageSender>(MessageSenderToken);
  });

  it('알림톡을 발송할 수 있다.', async () => {
    // given
    const bknamUserId = '5fd2f23f0716138bc79406a8';
    const templateCode = 'AWSguide';
    const channelId = '@르탄이';
    const tagData = {
      guide_link: 'https://spartacodingclub.kr',
      sparta_link: 'https://spartacodingclub.kr',
    };

    // when
    const status = await messageSender.sendAlimtalk(
      templateCode,
      bknamUserId,
      tagData,
      channelId,
    );

    // then
    expect(status).toBe(HttpStatus.ACCEPTED);
  });

  it('슬랙 메시지를 발송할 수 있다.', async () => {
    // given
    const workspaceUrl =
      'https://hooks.slack.com/services/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';
    const channel = '#슬랙_메시지_테스트';
    const text = 'sample from swc-backend';

    // when
    const status = await messageSender.sendSlack(workspaceUrl, channel, text);

    // then
    expect(status).toBe(HttpStatus.ACCEPTED);
  });

  it('SMS를 발송할 수 있다.', async () => {
    // given
    const phone = '01029291330';
    const subject = 'title';
    const msg = 'test short message';

    // when
    const status = await messageSender.sendSms(phone, subject, msg, null);

    // then
    expect(status).toBe(HttpStatus.ACCEPTED);
  });
});
