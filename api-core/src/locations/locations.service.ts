import { Injectable } from '@nestjs/common';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';

@Injectable()
export class LocationsService extends TypeOrmCrudService<Location> {
  constructor(
    @InjectRepository(Location)
    private readonly locationsRepository: Repository<Location>,
  ) {
    super(locationsRepository);
  }
}
