import { HttpException, HttpStatus } from '@nestjs/common'
import { ErrorCode } from '~/enums/error-code.enum'

export class AppException extends HttpException {
  constructor(
    message: string,
    public readonly code: number = ErrorCode.BAD_REQUEST,
    status: HttpStatus = HttpStatus.BAD_REQUEST
  ) {
    super({ message, code }, status)
  }
}