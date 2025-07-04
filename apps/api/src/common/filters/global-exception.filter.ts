import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { ErrorMessage } from '~/constant/error-message.constant'
import { ErrorCode } from '~/enums/error-code.enum'
import { ApiResponse } from '~/common/bases/api-response'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message: string | object[] = ErrorMessage.INTERNAL_SERVER_ERROR
    let code = ErrorCode.INTERNAL_SERVER_ERROR

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const response = exception.getResponse() as string | Record<string, any>
      message = typeof response === 'string'
        ? response
        : (response?.['message'] as string) || message
      code = typeof response === 'number'
        ? response
        : (response?.['code'] as number) || (status === HttpStatus.BAD_REQUEST
          ? ErrorCode.BAD_REQUEST
          : code
      )
    } else if (exception instanceof Error) {
      message = exception.message
    }

    res.status(status).json(new ApiResponse({ status, code, message }))
  }
}