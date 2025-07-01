export {}

declare global {
  namespace Express {
    interface User {
      sub: string // hoặc id: string nếu bạn đổi field trong payload
      email?: string
    }

    interface Request {
      user?: User
    }
  }
}