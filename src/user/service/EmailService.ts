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
      from: `Mockterview ๐ฅ๏ธ <${emailAuthUser}>`,
      to: emailAddress,
      subject: 'Mockterview ๋น๋ฐ๋ฒํธ ์ฌ์ค์  ์ด๋ฉ์ผ์๋๋ค.',
      html: `
        <head>
            <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" />
            <title>๋น๋ฐ๋ฒํธ ์ฌ์ค์ </title>
        </head>
        <body>
            <div style="justify-self:center; text-align:center; font-family:pretendard, Helvetica, sans-serif; color:#000;">
                <div style="font-size:20px; font-weight:500; margin:100px 0 40px 0;">์๋ํ์ธ์. Mockinterview์๋๋ค.</div>
                <div style="font-size:16px; text-align:center;">์์ฒญํ์  ๋น๋ฐ๋ฒํธ ์ฌ์ค์ ์ ์๋ดํด๋๋ฆฝ๋๋ค.</div>
                <div style="font-size:16px; text-align:center;">์๋์ ๋งํฌ๋ฅผ ํตํด ๋น๋ฐ๋ฒํธ๋ฅผ ์ฌ์ค์ ํ์ค ์ ์์ต๋๋ค.</div>
                <div style="font-size:16px; margin:45px 0 60px 0;">๊ฐ์ฌํฉ๋๋ค.</div>
                <a href="${url}" style="display:block; margin:auto; width:250px; background-color:#177DFF; font-size:18px; padding:21px 65px; border-radius:10px; border:none; color:white; text-decoration:none;">๋น๋ฐ๋ฒํธ ์ฌ์ค์ ํ๊ธฐ</a>
            </div>
        </body>
       `,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
