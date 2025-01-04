import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationsRepository: Repository<Location>,
  ) {}
  async create(createLocationDto: CreateLocationDto) {
    const location = this.locationsRepository.create(createLocationDto);
    await this.locationsRepository.save(location);
    return location;
  }

  async findAll() {
    return this.locationsRepository.find();
  }

  async findOne(id: string) {
    return this.locationsRepository.findOneBy({ id });
  }

  async update(id: string, updateLocationDto: UpdateLocationDto) {
    return this.locationsRepository.update({ id }, updateLocationDto);
  }

  async remove(id: string) {
    return this.locationsRepository.delete({ id });
  }
}
