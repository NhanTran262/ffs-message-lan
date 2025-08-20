import { HttpStatus } from '@nestjs/common'
import { ErrorCode } from '~/enums/error-code.enum'
import { ErrorMessage } from '~/constant/error-message.constant'

export class ApiResponse<T = any> {
  status: number
  code: number
  message: string
  data?: T

  constructor(partial: Partial<ApiResponse<T>>) {
    this.status = partial.status ?? HttpStatus.OK
    this.code = partial.code ?? ErrorCode.SUCCESS
    this.message = partial.message ?? ErrorMessage.SUCCESS
    this.data = partial.data
  }
}
