import { S } from '@faker-js/faker/dist/airline-CLphikKp'

export class SessionDto {
  userId: string
  deviceType: string
  deviceId: string
  keepDeviceId?: string
  field?: string
  data?: Record<string, string>
}
