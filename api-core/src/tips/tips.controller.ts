import { Controller } from '@nestjs/common';
import { TipsService } from './tips.service';
import { Tip } from './entities/tip.entity';
import { Crud, CrudController } from '@dataui/crud';

@Crud({
  model: {
    type: Tip,
  },
  // params: {
  //   id: {
  //     type: 'string',
  //     primary: true,
  //     field: 'id',
  //   },
  // },
})
@Controller('tips')
export class TipsController implements CrudController<Tip> {
  constructor(public service: TipsService) {}
}
