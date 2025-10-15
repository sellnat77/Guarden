import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PlantsService } from './plants.service';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { Plant } from './entities/plant.entity';
import { Crud, CrudController, CrudRequest } from '@dataui/crud';
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

  getOneBase(req: CrudRequest): Promise<Plant> {
    return this.getOneBase(req);
  }
}
