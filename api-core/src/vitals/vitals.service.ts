import { Injectable } from '@nestjs/common';
import { CreateVitalDto } from './dto/create-vital.dto';
import { UpdateVitalDto } from './dto/update-vital.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vital } from './entities/vital.entity';
import { Repository } from 'typeorm';
import { Plant } from 'src/plants/entities/plant.entity';

@Injectable()
export class VitalsService {
  constructor(
    @InjectRepository(Vital)
    private readonly vitalsRepository: Repository<Vital>,
    @InjectRepository(Plant)
    private readonly plantsRepository: Repository<Plant>,
  ) {}

  async create(createVitalDto: CreateVitalDto) {
    const vital: Vital = this.vitalsRepository.create(createVitalDto);
    vital.plant = await this.plantsRepository.findOneByOrFail({
      id: createVitalDto.plantId,
    });
    await this.vitalsRepository.save(vital);
    return vital;
  }

  findAll() {
    return this.vitalsRepository.find();
  }

  async findByPlant(plantId: string) {
    return this.vitalsRepository.findBy({ plant: { id: plantId } });
  }

  findOne(id: number) {
    return `This action returns a #${id} vital`;
  }

  update(id: number, updateVitalDto: UpdateVitalDto) {
    return `This action updates a #${id} vital`;
  }

  remove(id: number) {
    return `This action removes a #${id} vital`;
  }
}
