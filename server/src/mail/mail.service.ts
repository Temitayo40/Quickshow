import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  sendMail({
    to,
    subject,
    body,
  }: {
    to: string;
    subject: string;
    body: string;
  }) {
    const mailOptions = {
      from: `"Your App" <${process.env.MAIL_USER}>`,
      to,
      subject,
      body,
    };

    return mailOptions;
  }
}
