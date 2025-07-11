import { Body, Controller, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import { CurrentUser } from '~/common/decorators/current-user.decorator'
import { GetCookie } from '~/common/decorators/get-cookie.decorator'
import { LogoutGuard } from '~/common/guard/logout.guard'
import { FIFTEEN_MINUTES_TTL, THIRTY_DAYS_TTL } from '~/constant/ttl.constant'
import { CookieDto } from '~/dto/cookie.dto'
import { AuthRequest } from '~/dto/request/auth-request.dto'
import { RefreshTokenRequest } from '~/dto/request/refresh-token-request.dto'
import { AuthResponse } from '~/dto/response/auth-response.dto'
import { SessionDto } from '~/dto/session.dto'
import { AuthService } from '~/modules/auth/auth.service'

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() authRequest: AuthRequest,
    @GetCookie(['deviceId', 'deviceType']) cookie: CookieDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<Omit<AuthResponse, 'accessToken' | 'refreshToken' | 'csrfToken'>> {
    authRequest.deviceId = cookie.deviceId
    authRequest.deviceType = cookie.deviceType
    const result = await this.authService.authenticate(authRequest)
    response
      .cookie('accessToken', result.accessToken, {
        httpOnly: false,
        secure: false,
        sameSite: 'strict',
        maxAge: FIFTEEN_MINUTES_TTL
      })
      .cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: THIRTY_DAYS_TTL
      })
      .cookie('csrfToken', result.csrfToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: THIRTY_DAYS_TTL
      })
    return {
      id: result.id,
      phone: result.phone,
      fullName: result.fullName,
      roles: result.roles,
      avatar: result.avatar
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  async refreshToken(
    @Body() refreshTokenRequest: RefreshTokenRequest,
    @GetCookie(['deviceId', 'deviceType', 'refreshToken', 'csrfToken']) cookie: CookieDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<Omit<AuthResponse, 'accessToken' | 'refreshToken' | 'csrfToken'>> {
    refreshTokenRequest.refreshToken = cookie.refreshToken
    refreshTokenRequest.csrfToken = cookie.csrfToken
    refreshTokenRequest.deviceId = cookie.deviceId
    refreshTokenRequest.deviceType = cookie.deviceType
    const result = await this.authService.refreshToken(refreshTokenRequest)
    response
      .cookie('accessToken', result.accessToken, {
        httpOnly: false,
        secure: false,
        sameSite: 'strict',
        maxAge: FIFTEEN_MINUTES_TTL
      })
      .cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: THIRTY_DAYS_TTL
      })
      .cookie('csrfToken', result.csrfToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: THIRTY_DAYS_TTL
      })
    return {
      id: result.id,
      phone: result.phone,
      fullName: result.fullName,
      roles: result.roles,
      avatar: result.avatar
    }
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LogoutGuard)
  @Post('logout')
  async logout(
    @Body() sessionDto: SessionDto,
    @CurrentUser() user: Express.User,
    @GetCookie(['deviceType', 'deviceId']) cookie: CookieDto,
    @Res({ passthrough: true }) response: Response
  ) {
    sessionDto.userId = user.sub
    sessionDto.deviceType = cookie.deviceType
    sessionDto.deviceId = cookie.deviceId
    await this.authService.logout(sessionDto)
    response
      .clearCookie('deviceId')
      .clearCookie('deviceType')
      .clearCookie('accessToken')
      .clearCookie('refreshToken')
      .clearCookie('csrfToken')
  }
}
