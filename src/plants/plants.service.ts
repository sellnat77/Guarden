import { Injectable } from '@nestjs/common';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Plant } from './entities/plant.entity';

@Injectable()
export class PlantsService {
  constructor(
    @InjectRepository(Plant)
    private readonly plantsRepository: Repository<Plant>,
  ) {}
  async create(createPlantDto: CreatePlantDto) {
    const plant = this.plantsRepository.create(createPlantDto);
    await this.plantsRepository.save(plant);
    return plant;
  }

  async findAll() {
    return this.plantsRepository.find();
  }

  async findOne(id: string) {
    return this.plantsRepository.findOneBy({ id });
  }

  async update(id: string, updatePlantDto: UpdatePlantDto) {
    return this.plantsRepository.update({ id }, updatePlantDto);
  }

  async remove(id: string) {
    return this.plantsRepository.delete({ id });
  }
}
