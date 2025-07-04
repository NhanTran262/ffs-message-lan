import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from '~/modules/users/user.module'
import { AuthModule } from '~/modules/auth/auth.module'
import { PrismaModule } from '~/modules/prisma/prisma.module'
import { GroupModule } from '~/modules/groups/group.module'
import { MessageModule } from '~/modules/messages/message.module'
import { ChatModule } from '~/modules/chats/chat.module'

@Module({
  imports: [AuthModule, UserModule, PrismaModule, GroupModule, MessageModule,ChatModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
