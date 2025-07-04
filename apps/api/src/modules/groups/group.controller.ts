import { Controller } from '@nestjs/common'
import { GroupService } from '~/modules/groups/group.service'

@Controller()
export class GroupController {
  constructor(private readonly groupService: GroupService) {
  }

}
