import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const GetCookie = createParamDecorator(
  (key: string | string[] | undefined, context: ExecutionContext): string | Record<string, string> | undefined => {
    const request = context.switchToHttp().getRequest()
    const cookies = request.cookies
    if (!key) return cookies
    if (Array.isArray(key)) {
      const result: Record<string, string> = {}
      for (const k of key) {
        if (cookies?.[k]) result[k] = cookies[k]
      }
      return result
    }
    return cookies?.[key]
  }
)
