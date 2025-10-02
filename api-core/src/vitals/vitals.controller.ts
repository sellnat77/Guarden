import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VitalsService } from './vitals.service';
import { CreateVitalDto } from './dto/create-vital.dto';
import { UpdateVitalDto } from './dto/update-vital.dto';
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
