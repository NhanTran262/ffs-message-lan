import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService, TokenExpiredError } from '@nestjs/jwt'
import { Request } from 'express'
import { AppException } from '~/common/exceptions/app-exception'
import { ErrorMessage } from '~/constant/error-message.constant'
import { jwtConstants } from '~/constant/jwt.constant'
import { ErrorCode } from '~/enums/error-code.enum'

@Injectable()
export class LogoutGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const accessToken = this.extractTokenFromHeader(request)
    if (!accessToken) {
      throw new AppException('Access token not found', ErrorCode.NOT_FOUND, HttpStatus.NOT_FOUND)
    }
    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: jwtConstants.accessTokenSecret
      })

      request['user'] = payload
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        const payload = this.jwtService.decode(accessToken)
        if (payload && typeof payload === 'object') {
          request['user'] = payload
          return true
        }
      }
      throw new AppException(ErrorMessage.UNAUTHORIZED, ErrorCode.UNAUTHORIZED, HttpStatus.UNAUTHORIZED)
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
