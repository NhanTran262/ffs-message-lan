import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common'
import { ApiResponse } from '~/common/bases/api-response'
import { map, Observable } from 'rxjs'
import { ErrorCode } from '~/enums/error-code.enum'

@Injectable()
export class ApiResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(_context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<T>> {
    return next.handle().pipe(map((data) => new ApiResponse({
      status: HttpStatus.OK,
      code: ErrorCode.SUCCESS,
      data
    })))
  }
}