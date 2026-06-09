import { Body, Controller, Inject, Post } from '@midwayjs/core';
import { MailService } from '../service/mail.service';

interface SendMailBody {
  to?: string;
  subject?: string;
  text?: string;
  body?: string;
}

@Controller('/mail')
export class MailController {
  @Inject()
  mailService: MailService;

  @Post('/test')
  async test(@Body() body: SendMailBody) {
    await this.mailService.sendTest(
      body.to ?? 'user@example.test',
      body.subject ?? 'Midway + Mailexam',
      body.text ?? body.body ?? 'Mailexam test from Midway.js'
    );

    return { status: 'ok' };
  }
}
