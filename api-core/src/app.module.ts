import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { PlantsModule } from './plants/plants.module';
import { LocationsModule } from './locations/locations.module';
import { SchedulesModule } from './schedules/schedules.module';
import { VitalsModule } from './vitals/vitals.module';
import { RoutinesModule } from './routines/routines.module';
import { QrCodesModule } from './qr-codes/qr-codes.module';
import { TipsModule } from './tips/tips.module';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    ConfigModule,
    UsersModule,
    PlantsModule,
    LocationsModule,
    SchedulesModule,
    TipsModule,
    VitalsModule,
    RoutinesModule,
    QrCodesModule,
  ],
})
export class AppModule {}
