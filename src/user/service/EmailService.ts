import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import configuration from '../../../config/configuration';

interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const {
  mail: { emailService, emailAuthUser, emailAuthPassword, emailBaseUrl },
} = configuration();

export const EmailServiceToken = 'EmailServiceToken';

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: emailService,
      auth: {
        user: emailAuthUser,
        pass: emailAuthPassword,
      },
    });
  }

  async sendUserMailTransport(
    emailAddress: string,
    changePassVerifyToken: string,
  ) {
    const url = `${emailBaseUrl}/reset/token?key=${changePassVerifyToken}`;

    const mailOptions: EmailOptions = {
      from: `Mockterview 👥️ <${emailAuthUser}>`,
      to: emailAddress,
      subject: 'Mockterview 비밀번호 재설정 이메일입니다.',
      html: `
        <head>
            <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" />
            <title>비밀번호 재설정</title>
        </head>
        <body>
            <div style="justify-self:center; text-align:center; font-family:pretendard, Helvetica, sans-serif; color:#000;">
                <div style="font-size:20px; font-weight:500; margin:100px 0 40px 0;">안녕하세요. Mockinterview입니다.</div>
                <div style="font-size:16px; text-align:center;">요청하신 비밀번호 재설정을 안내해드립니다.</div>
                <div style="font-size:16px; text-align:center;">아래의 링크를 통해 비밀번호를 재설정하실 수 있습니다.</div>
                <div style="font-size:16px; margin:45px 0 60px 0;">감사합니다.</div>
                <a href="${url}" style="display:block; margin:auto; width:250px; background-color:#177DFF; font-size:18px; padding:21px 65px; border-radius:10px; border:none; color:white; text-decoration:none;">비밀번호 재설정하기</a>
            </div>
        </body>
       `,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
