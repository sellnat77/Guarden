import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { Crud, CrudController } from '@dataui/crud';
import { UserEntity } from './entities/user.entity';

@Crud({
  model: {
    type: UserEntity,
  },
})
@Controller('users')
export class UsersController implements CrudController<UserEntity> {
  constructor(public service: UsersService) {}
}
