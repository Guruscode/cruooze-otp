import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { OtpService } from './otp.service';

@Controller('otp')
@ApiTags('OTP')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('send')
  @ApiOperation({ summary: 'Generate and send OTP to an email' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
      },
      required: ['email'],
    },
  })
  @ApiResponse({ status: 200, description: 'OTP sent successfully', schema: {
    type: 'object',
    properties: {
      message: { type: 'string', example: 'OTP sent successfully' },
      otp: { type: 'string', example: '123456' },
    },
  }})
  @ApiResponse({ status: 400, description: 'Email is required' })
  @ApiResponse({ status: 500, description: 'Failed to send OTP' })
  async sendOtp(@Body('email') email: string) {
    if (!email) {
      throw new HttpException('Email is required', HttpStatus.BAD_REQUEST);
    }
    try {
      const otp = await this.otpService.generateAndSendOtp(email);
      return { message: 'OTP sent successfully', otp };
    } catch (error) {
      throw new HttpException('Failed to send OTP', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('resend')
  @ApiOperation({ summary: 'Resend OTP to an email' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
      },
      required: ['email'],
    },
  })
  @ApiResponse({ status: 200, description: 'OTP resent successfully', schema: {
    type: 'object',
    properties: {
      message: { type: 'string', example: 'OTP resent successfully' },
      otp: { type: 'string', example: '123456' },
    },
  }})
  @ApiResponse({ status: 400, description: 'Email is required' })
  @ApiResponse({ status: 500, description: 'Failed to resend OTP' })
  async resendOtp(@Body('email') email: string) {
    if (!email) {
      throw new HttpException('Email is required', HttpStatus.BAD_REQUEST);
    }
    try {
      const otp = await this.otpService.generateAndSendOtp(email);
      return { message: 'OTP resent successfully', otp };
    } catch (error) {
      throw new HttpException('Failed to resend OTP', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}