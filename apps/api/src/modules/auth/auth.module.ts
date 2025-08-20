import { Module } from '@nestjs/common'
import { AuthController } from '~/modules/auth/auth.controller'
import { AuthService } from '~/modules/auth/auth.service'
import { UserModule } from '~/modules/users/user.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
