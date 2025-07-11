import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AppException } from '~/common/exceptions/app-exception'
import { jwtConstants } from '~/constant/jwt.constant'
import { ErrorCode } from '~/enums/error-code.enum'
import { SessionService } from '~/modules/session/session.service'

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const { deviceId, deviceType, refreshToken, csrfToken } = request.cookies

    if (!deviceId || !deviceType || !csrfToken || !refreshToken)
      throw new AppException(
        'Missing refresh token headers or cookies',
        ErrorCode.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED
      )
    let payload: any
    try {
      payload = await this.jwtService.verifyAsync(refreshToken, { secret: jwtConstants.refreshTokenSecret })
    } catch {
      throw new AppException('Invalid refresh token', ErrorCode.UNAUTHORIZED, HttpStatus.UNAUTHORIZED)
    }
    const csrfTokenSession = await this.sessionService.getSessionField({
      userId: payload.sub,
      deviceType,
      deviceId,
      field: 'csrfToken'
    })
    if (!csrfTokenSession || csrfTokenSession !== csrfToken)
      throw new AppException('Invalid csrf token', ErrorCode.UNAUTHORIZED, HttpStatus.UNAUTHORIZED)
    return true
  }
}
