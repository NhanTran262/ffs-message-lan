import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from '~/modules/users/user.module'
import { AuthModule } from '~/modules/auth/auth.module'
import { PrismaModule } from '~/modules/prisma/prisma.module'
import { ConversationModule } from '~/modules/conversations/conversation.module'
import { MessageModule } from '~/modules/messages/message.module'
import { ChatModule } from '~/modules/chats/chat.module'
import { RedisModule } from '~/modules/redis/redis.module'
import { SessionModule } from '~/modules/session/session.module'
import { JwtModule } from '@nestjs/jwt'
import { TwilioModule } from 'nestjs-twilio'
import { OtpModule } from '~/modules/otp/otp.module'

@Module({
  imports: [
    RedisModule,
    PrismaModule,
    SessionModule,
    AuthModule,
    OtpModule,
    UserModule,
    ConversationModule,
    MessageModule,
    ChatModule,
    JwtModule.register({
      global: true
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
