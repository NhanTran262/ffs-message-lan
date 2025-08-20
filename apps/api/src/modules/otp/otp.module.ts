import { Module } from '@nestjs/common'
import { TwilioModule } from 'nestjs-twilio'
import { OtpController } from '~/modules/otp/otp.controller'
import { OtpService } from '~/modules/otp/otp.service'

@Module({
  imports: [
    TwilioModule.forRoot({
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN
    })
  ],
  controllers: [OtpController],
  providers: [OtpService]
})
export class OtpModule {}
