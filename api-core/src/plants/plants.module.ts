import { Module } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { PlantsController } from './plants.controller';
import { Plant } from './entities/plant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from 'src/config/jwt.config.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
    TypeOrmModule.forFeature([Plant]),
  ],
  controllers: [PlantsController],
  providers: [PlantsService],
})
export class PlantsModule {}
