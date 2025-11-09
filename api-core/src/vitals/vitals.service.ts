import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Vital } from './entities/vital.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VitalsService extends TypeOrmCrudService<Vital> {
  constructor(
    @InjectRepository(Vital)
    private readonly vitalRepository: Repository<Vital>,
  ) {
    super(vitalRepository);
  }
}
