import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/decorators/user.decorator';

@UseGuards(AuthGuard)
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  create(@User() user: any, @Body() createLocationDto: CreateLocationDto) {
    console.log(user);
    console.log(createLocationDto);
    createLocationDto.createdBy = user.sub;
    return this.locationsService.create(createLocationDto);
  }

  @Patch('location/:locationId')
  update(
    @User() user: any,
    @Param('locationId') locationId: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    console.log(user);
    console.log(updateLocationDto);
    updateLocationDto.createdBy = user.sub;
    return this.locationsService.update(locationId, updateLocationDto);
  }

  @Get()
  findAll() {
    return this.locationsService.findAll();
  }

  @Get('/location/:id')
  findOne(@Param('id') id: string) {
    return this.locationsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationsService.remove(id);
  }
}
