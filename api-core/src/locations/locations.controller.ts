import { Controller, UseGuards } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Crud, CrudController } from '@dataui/crud';
import { Location } from './entities/location.entity';

@UseGuards(AuthGuard)
@Crud({
  model: {
    type: Location,
  },
  params: {
    id: {
      type: 'string',
      primary: true,
      field: 'id',
    },
  },
})
@Controller('locations')
export class LocationsController implements CrudController<Location> {
  constructor(public service: LocationsService) {}
}
