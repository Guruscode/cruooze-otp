import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class OtpService {
  constructor(private readonly mailerService: MailerService) {}

  generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async generateAndSendOtp(email: string): Promise<string> {
    const otp = this.generateOtp();
    
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Your OTP Code',
        template: 'otp-email',
        context: {
          otp,
        },
      });
      return otp;
    } catch (error) {
      console.error('Email sending error:', error);
      throw new Error('Failed to send email: ' + error.message);
    }
  }
}