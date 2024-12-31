import { Module } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { PlantsController } from './plants.controller';
import { LocationsModule } from 'src/locations/locations.module';
import { Plant } from './entities/plant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [LocationsModule, TypeOrmModule.forFeature([Plant])],
  controllers: [PlantsController],
  providers: [PlantsService],
})
export class PlantsModule {}
