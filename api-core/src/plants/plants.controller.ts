import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PlantsService } from './plants.service';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/decorators/user.decorator';

@UseGuards(AuthGuard)
@Controller('plants')
export class PlantsController {
  constructor(private readonly plantsService: PlantsService) {}

  @Post()
  create(@User() user: any, @Body() createPlantDto: CreatePlantDto) {
    console.log(user);
    createPlantDto.createdBy = user.sub;
    return this.plantsService.create(createPlantDto);
  }

  @Get()
  findAll() {
    return this.plantsService.findAll();
  }

  @Get('stats')
  stats() {
    return this.plantsService.stats();
  }

  @Get('location/:locationId')
  findByLocation(@Param('locationId') locationId: string) {
    console.log(locationId);
    return this.plantsService.findByLocation(locationId);
  }

  @Get('/plant/:id')
  findOne(@Param('id') id: string) {
    return this.plantsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlantDto: UpdatePlantDto) {
    return this.plantsService.update(id, updatePlantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plantsService.remove(id);
  }
}
