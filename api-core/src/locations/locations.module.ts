import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { Location } from './entities/location.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from 'src/config/jwt.config.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
    TypeOrmModule.forFeature([Location]),
  ],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
