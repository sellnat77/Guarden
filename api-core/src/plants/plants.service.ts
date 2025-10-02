import { Injectable } from '@nestjs/common';
// import { CreatePlantDto } from './dto/create-plant.dto';
// import { UpdatePlantDto } from './dto/update-plant.dto';
import { Plant } from './entities/plant.entity';
// import { Location } from 'src/locations/entities/location.entity';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlantsService extends TypeOrmCrudService<Plant> {
  constructor(
    @InjectRepository(Plant)
    private readonly plantRepository: Repository<Plant>,
  ) {
    super(plantRepository);
  }
}
