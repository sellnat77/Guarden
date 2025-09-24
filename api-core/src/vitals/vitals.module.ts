import { Module } from '@nestjs/common';
import { VitalsService } from './vitals.service';
import { VitalsController } from './vitals.controller';
import { PlantsModule } from 'src/plants/plants.module';
import { Vital } from './entities/vital.entity';
import { Plant } from 'src/plants/entities/plant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtConfigService } from 'src/config/jwt.config.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
    PlantsModule,
    TypeOrmModule.forFeature([Plant, Vital]),
  ],
  controllers: [VitalsController],
  providers: [VitalsService],
})
export class VitalsModule {}
