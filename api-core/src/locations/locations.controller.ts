import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/decorators/user.decorator';
import { Crud, CrudController } from '@dataui/crud';
import { Location } from './entities/location.entity';

// @UseGuards(AuthGuard)
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
