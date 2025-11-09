import { Controller } from '@nestjs/common';
import { VitalsService } from './vitals.service';
import { Crud, CrudController } from '@dataui/crud';
import { Vital } from './entities/vital.entity';

@Crud({
  model: {
    type: Vital,
  },
})
@Controller('vitals')
export class VitalsController implements CrudController<Vital> {
  constructor(public service: VitalsService) {}
}
