import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Location } from 'src/locations/entities/location.entity';
import { Plant } from 'src/plants/entities/plant.entity';
import { Tip } from 'src/tips/entities/tip.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: process.env.DB_TYPE || ('postgres' as any),
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'guardener',
      password: process.env.DB_PASSWORD || 'guardener',
      database: process.env.DB_NAME || 'guarden',
      entities: [User, Plant, Location, Tip],
      synchronize: true,
    };
  }
}
