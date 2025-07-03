import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from '~/modules/users/user.module'
import { AuthModule } from '~/modules/auth/auth.module'
import { PrismaModule } from '~/modules/prisma/prisma.module'

@Module({
  imports: [AuthModule, UserModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
