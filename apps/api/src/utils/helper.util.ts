import { HttpStatus, Logger } from '@nestjs/common'
import { AppException } from '~/common/exceptions/app-exception'
import { ErrorMessage } from '~/constant/error-message.constant'
import { ErrorCode } from '~/enums/error-code.enum'

export function stringifyValues(obj: Record<string, any>): Record<string, string> {
  const result: Record<string, string> = {}
  for (const key in obj) {
    const value = obj[key]
    result[key] = typeof value === 'bigint' ? value.toString() : String(value)
  }
  return result
}

export async function handleWithFallback<T>(handler: () => Promise<T>, context: string, logger?: Logger): Promise<T> {
  try {
    return await handler()
  } catch (error) {
    if (error instanceof Error) {
      if (logger) {
        logger.error(`Error in ${context}: ${error.message}`, error.stack)
      }
      throw error
    } else {
      throw new AppException(
        ErrorMessage.INTERNAL_SERVER_ERROR,
        ErrorCode.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
