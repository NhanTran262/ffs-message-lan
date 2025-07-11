import { Controller } from '@nestjs/common'
import { MessageService } from '~/modules/messages/message.service'

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
}
