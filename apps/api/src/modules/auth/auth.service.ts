import { HttpStatus, Injectable, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { AppException } from '~/common/exceptions/app-exception'
import { ErrorMessage } from '~/constant/error-message.constant'
import { jwtConstants } from '~/constant/jwt.constant'
import { AuthContextDto } from '~/dto/auth-context.dto'
import { AuthRequest } from '~/dto/request/auth-request.dto'
import { RefreshTokenRequest } from '~/dto/request/refresh-token-request.dto'
import { AuthResponse } from '~/dto/response/auth-response.dto'
import { SessionDto } from '~/dto/session.dto'
import { ErrorCode } from '~/enums/error-code.enum'
import { SessionService } from '~/modules/session/session.service'
import { UserRepository } from '~/modules/users/user.repository'
import { handleWithFallback, stringifyValues } from '~/utils/helper.util'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionService: SessionService,
    private readonly jwtService: JwtService
  ) {}

  async authenticate(authRequest: AuthRequest): Promise<AuthResponse> {
    return handleWithFallback(
      async () => {
        return await this.generateAuthContext(authRequest)
          .then((context) => this.validateUser(context))
          .then((context) => this.handleSession(context))
          .then((context) => this.authResponse(context))
      },
      'AuthService.authenticate',
      this.logger
    )
  }

  async refreshToken(refreshTokenRequest: RefreshTokenRequest): Promise<AuthResponse> {
    return handleWithFallback(
      async () => {
        return await this.generateRefreshTokenContext(refreshTokenRequest)
          .then((context) => this.validateUser(context))
          .then((context) => this.handleSession(context))
          .then((context) => this.authResponse(context))
      },
      'AuthService.refreshToken',
      this.logger
    )
  }

  async logout(sessionDto: SessionDto): Promise<void> {
    handleWithFallback(
      async () => {
        await this.sessionService.deleteSession(sessionDto)
      },
      'AuthService.logout',
      this.logger
    )
  }

  private async generateAuthContext(authRequest: AuthRequest): Promise<AuthContextDto> {
    return Promise.resolve({
      authRequest: authRequest,
      user: null
    })
  }

  private async generateRefreshTokenContext(refreshTokenRequest: RefreshTokenRequest): Promise<AuthContextDto> {
    const payload = await this.jwtService.verifyAsync(refreshTokenRequest.refreshToken, {
      secret: jwtConstants.refreshTokenSecret
    })
    return Promise.resolve({
      authRequest: {
        phone: payload.phone,
        password: '',
        deviceType: refreshTokenRequest.deviceType,
        deviceId: refreshTokenRequest.deviceId
      },
      user: null,
      refreshToken: refreshTokenRequest.refreshToken,
      csrfToken: refreshTokenRequest.csrfToken
    })
  }

  private async validateUser(context: AuthContextDto): Promise<AuthContextDto> {
    const user = await this.userRepository.findByPhone(context.authRequest.phone)
    if (!user)
      throw new AppException(ErrorMessage.WRONG_PHONE_PASSWORD, ErrorCode.WRONG_PHONE_PASSWORD, HttpStatus.UNAUTHORIZED)
    if (context.authRequest.password) {
      const isValidPassword = bcrypt.compare(context.authRequest.password, user.password)
      if (!isValidPassword)
        throw new AppException(
          ErrorMessage.WRONG_PHONE_PASSWORD,
          ErrorCode.WRONG_PHONE_PASSWORD,
          HttpStatus.UNAUTHORIZED
        )
    }
    context.user = {
      id: user.id,
      fullName: user.fullName,
      phone: user.phone,
      password: user.password,
      roles: user.userRoles?.map((userRole) => userRole.role.name) ?? [],
      image: (user.images as { url: string }[])?.[0]?.url ?? null
    }
    return context
  }

  private async handleSession(context: AuthContextDto): Promise<AuthContextDto> {
    const session = await this.sessionService.getSession({
      userId: context.user.id.toString(),
      deviceType: context.authRequest.deviceType,
      deviceId: context.authRequest.deviceId
    })
    if (!session) {
      await this.generateSession(context)
      return context
    }
    if (session.refreshToken && session.csrfToken) {
      if (session.refreshToken !== context.refreshToken || session.csrfToken !== context.csrfToken) {
        throw new AppException(
          ErrorMessage.CSRF_TOKEN_OR_REFRESH_TOKEN_NOT_MATCH,
          ErrorCode.UNAUTHORIZED,
          HttpStatus.UNAUTHORIZED
        )
      }
    }
    await this.generateSession(context)
    return context
  }

  private async generateSession(context: AuthContextDto): Promise<void> {
    const tokens = await this.generateTokens(context)

    await this.sessionService.deleteOtherDeviceSessions({
      userId: context.user.id.toString(),
      deviceType: context.authRequest.deviceType,
      deviceId: context.authRequest.deviceId
    })

    await this.sessionService.setSession({
      userId: context.user.id.toString(),
      deviceType: context.authRequest.deviceType,
      deviceId: context.authRequest.deviceId,
      data: stringifyValues({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        csrfToken: tokens.csrfToken,
        createAt: new Date().toISOString()
      })
    })
  }

  private async generateTokens(context: AuthContextDto): Promise<AuthContextDto> {
    const payload = { sub: context.user.id.toString(), phone: context.user.phone }
    context.accessToken = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.accessTokenSecret,
      expiresIn: '15m'
    })
    context.refreshToken = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.refreshTokenSecret,
      expiresIn: '30d'
    })
    context.csrfToken = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.csrfTokenSecret,
      expiresIn: '30d'
    })
    return context
  }

  private async authResponse(context: AuthContextDto): Promise<AuthResponse> {
    return {
      id: context.user.id.toString(),
      fullName: context.user.fullName,
      phone: context.user.phone,
      roles: context.user.roles,
      avatar: context.user.image,
      accessToken: context.accessToken,
      refreshToken: context.refreshToken,
      csrfToken: context.csrfToken
    }
  }
}
