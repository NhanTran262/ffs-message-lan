import { Module } from '@nestjs/common'
import { GroupController } from '~/modules/groups/group.controller'
import { GroupService } from '~/modules/groups/group.service'

@Module({
  imports: [],
  controllers: [GroupController],
  providers: [GroupService]
})
export class GroupModule {}
