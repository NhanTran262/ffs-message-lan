import { Injectable } from '@nestjs/common'
import { TwilioService } from 'nestjs-twilio'

//todo:Send OTP -> 1-Generate OTP -> 2-Send OTP via SMS

@Injectable()
export class OtpService {
  constructor(private readonly twilioService: TwilioService) {}

  generateOtp(length = 6) {
    return Math.floor(Math.random() * Math.pow(10, length))
      .toString()
      .padStart(length, '0')
  }

  async sendOtp(phoneNumber: string) {
    const serviceSid = process.env.TWILIO_SERVICE_SID
    console.log(serviceSid, 'serviceSid')
    const otp = this.generateOtp()
    console.log(otp, 'otp')

    const verifications = await this.twilioService.client.verify.v2
      .services(serviceSid)
      .verifications.create({ to: phoneNumber, channel: 'sms' })
    return verifications
  }

  async verifyOtp(phoneNumber: string, code: string) {
    const serviceSid = process.env.TWILIO_SERVICE_SID
    console.log(serviceSid, 'serviceSid')

    const verificationCheck = await this.twilioService.client.verify.v2
      .services(serviceSid)
      .verificationChecks.create({ to: phoneNumber, code })
    return verificationCheck.status === 'approved'
  }
}
