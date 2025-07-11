import { Global, Module } from '@nestjs/common'
import { SessionService } from '~/modules/session/session.service'

@Global()
@Module({
  providers: [SessionService],
  exports: [SessionService]
})
export class SessionModule {}
