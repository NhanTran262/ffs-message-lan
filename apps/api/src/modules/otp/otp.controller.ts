import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { OtpService } from '~/modules/otp/otp.service'

@Controller('v1/otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @HttpCode(HttpStatus.OK)
  @Post('send')
  async sendOtp(@Body('phone') phoneNumber: string) {
    return await this.otpService.sendOtp(phoneNumber)
  }

  @HttpCode(HttpStatus.OK)
  @Post('verify')
  async verifyOtp(@Body('phone') phoneNumber: string, @Body('code') code: string) {
    return await this.otpService.verifyOtp(phoneNumber, code)
  }
}
