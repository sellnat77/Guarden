import { Injectable } from '@nestjs/common';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Plant } from './entities/plant.entity';
import { Location } from 'src/locations/entities/location.entity';

@Injectable()
export class PlantsService {
  constructor(
    @InjectRepository(Plant)
    private readonly plantsRepository: Repository<Plant>,
    @InjectRepository(Location)
    private readonly locationsRepository: Repository<Location>,
  ) {}
  async create(createPlantDto: CreatePlantDto) {
    const plant = this.plantsRepository.create(createPlantDto);
    plant.location = await this.locationsRepository.findOneByOrFail({
      id: createPlantDto.locationId,
    });
    await this.plantsRepository.save(plant);
    return plant;
  }

  async findAll() {
    return this.plantsRepository.find();
  }

  async findByLocation(locationId: string) {
    return this.plantsRepository.findBy({ location: { id: locationId } });
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
