export class AuthResponse {
  id?: string
  fullName: string
  phone: string
  roles?: string[]
  avatar?: string
  accessToken: string
  refreshToken: string
  csrfToken: string
}