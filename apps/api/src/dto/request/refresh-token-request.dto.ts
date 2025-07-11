import { IsOptional, IsString } from 'class-validator'

export class RefreshTokenRequest {
  @IsString()
  @IsOptional()
  refreshToken: string

  @IsString()
  @IsOptional()
  csrfToken: string

  @IsString()
  @IsOptional()
  deviceId: string

  @IsString()
  @IsOptional()
  deviceType: string
}
