import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Plant } from 'src/plants/entities/plant.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationsRepository: Repository<Location>,
  ) {}
  async create(createLocationDto: CreateLocationDto) {
    const location = this.locationsRepository.create(createLocationDto);
    await this.locationsRepository.upsert(location, ['name']);
    return location;
  }

  async findAll() {
    return this.locationsRepository.find({
      relations: { plants: true },
    });
  }

  async findOne(id: string) {
    return this.locationsRepository.findOneBy({ id });
  }

  async update(locationId: string, updateLocationDto: UpdateLocationDto) {
    return this.locationsRepository.update(
      { id: locationId },
      updateLocationDto,
    );
  }

  async remove(id: string) {
    return this.locationsRepository.delete({ id });
  }
}
