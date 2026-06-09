import { Provide } from '@midwayjs/core';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

@Provide()
export class MailService {
  private createTransport(): Transporter {
    const login = process.env.MAILEXAM_LOGIN!;
    const port = Number(process.env.MAILEXAM_PORT || 587);

    return nodemailer.createTransport({
      host: `${login}.mailexam.io`,
      port,
      secure: port === 465,
      auth: {
        user: login,
        pass: process.env.MAILEXAM_PASSWORD,
      },
    });
  }

  async sendTest(to: string, subject: string, text: string): Promise<void> {
    const from = process.env.MAIL_FROM || 'noreply@example.test';

    await this.createTransport().sendMail({
      from,
      to,
      subject,
      text,
    });
  }
}
