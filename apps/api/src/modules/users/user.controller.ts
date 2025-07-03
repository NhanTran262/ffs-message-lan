import { Controller, Get } from '@nestjs/common';
import { UserService } from '~/modules/users/user.service'

@Controller()
export class UserController {
  constructor(private readonly uaeService: UserService) {}

  @Get()
  getHello(): string {
    return this.uaeService.getHello();
  }
}
