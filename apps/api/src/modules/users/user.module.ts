import { Module } from '@nestjs/common'
import { UserController } from '~/modules/users/user.controller'
import { UserService } from '~/modules/users/user.service'

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {
}
