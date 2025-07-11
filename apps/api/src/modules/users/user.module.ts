import { Module } from '@nestjs/common'
import { UserController } from '~/modules/users/user.controller'
import { UserService } from '~/modules/users/user.service'
import { UserRepository } from '~/modules/users/user.repository'

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository]
})
export class UserModule {}
