import { Module } from '@nestjs/common';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'olurichardisaac@gmail.com',
          pass: 'cvkxboockxbdcjgz',
        },
      },
      defaults: {
        from: '"Cruooze Team" <olurichardisaac@gmail.com>',
      },
      template: {
        dir: process.cwd() + '/src/templates/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [OtpController],
  providers: [OtpService],
})
export class OtpModule {}