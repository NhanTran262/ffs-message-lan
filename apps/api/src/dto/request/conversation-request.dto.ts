import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class ConversationRequestDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsBoolean()
  isPrivate: boolean

  @IsBoolean()
  isGroup: boolean

  @IsNumber()
  currentUserId: number

  @IsArray()
  @IsNumber({}, { each: true })
  participantIds?: number[]
}
