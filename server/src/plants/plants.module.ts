import { Module } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { PlantsController } from './plants.controller';
import { LocationsModule } from 'src/locations/locations.module';
import { Plant } from './entities/plant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from 'src/config/jwt.config.service';
import { Location } from 'src/locations/entities/location.entity';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
    LocationsModule,
    TypeOrmModule.forFeature([Plant, Location]),
  ],
  controllers: [PlantsController],
  providers: [PlantsService],
})
export class PlantsModule {}
