export class ConversationByCurrentUserResponseDto {
  userId: string
  fullName: string | null
  avatar?: string | null
  lastMessage: string | ''
  sendAt: Date | null
}
