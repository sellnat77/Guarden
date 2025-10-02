import { Module } from '@nestjs/common';
import { VitalsService } from './vitals.service';
import { VitalsController } from './vitals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vital } from './entities/vital.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vital])],
  controllers: [VitalsController],
  providers: [VitalsService],
})
export class VitalsModule {}
