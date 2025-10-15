import { Controller, UseGuards } from '@nestjs/common';
import { PlantsService } from './plants.service';

import { Plant } from './entities/plant.entity';
import { Crud, CrudController } from '@dataui/crud';
import { AuthGuard } from 'src/auth/auth.guard';

@Crud({
  model: {
    type: Plant,
  },
  params: {
    id: {
      type: 'string',
      primary: true,
      field: 'id',
    },
  },
  query: {
    join: {
      location: {
        eager: true,
      },
    },
  },
})
@Controller('plants')
@UseGuards(AuthGuard)
export class PlantsController implements CrudController<Plant> {
  constructor(public service: PlantsService) {}
}
