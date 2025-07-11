import { AuthRequest } from '~/dto/request/auth-request.dto'
import { UserDto } from '~/dto/user.dto'

export class AuthContextDto {
  authRequest?: AuthRequest
  user?: UserDto
  accessToken?: string
  refreshToken?: string
  csrfToken?: string
}
