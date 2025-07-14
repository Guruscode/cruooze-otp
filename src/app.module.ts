import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { OtpModule } from './otp/otp.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OtpModule,
  ],
  controllers: [AppController],
})
export class AppModule {}