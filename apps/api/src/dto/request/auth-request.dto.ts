import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'
import { ErrorMessage } from '~/constant/error-message.constant'

export class AuthRequest {
  @IsNotEmpty({ message: ErrorMessage.EMAIL_REQUIRED })
  @IsString()
  phone: string

  @IsNotEmpty({ message: ErrorMessage.PASSWORD_REQUIRED })
  @MinLength(6, { message: ErrorMessage.PASSWORD_TOO_SHORT })
  @IsString()
  password: string

  @IsString()
  @IsOptional()
  fullName?: string

  @IsString()
  @IsOptional()
  deviceId?: string

  @IsString()
  @IsOptional()
  deviceType?: string
}
