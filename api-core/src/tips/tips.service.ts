import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Tip } from './entities/tip.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TipsService extends TypeOrmCrudService<Tip> {
  constructor(
    @InjectRepository(Tip) private readonly tipsRepository: Repository<Tip>,
  ) {
    super(tipsRepository);
  }
}
