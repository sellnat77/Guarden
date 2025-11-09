import { Controller, Get, Param, Delete } from '@nestjs/common';
import { RoutinesService } from './routines.service';

@Controller('routines')
export class RoutinesController {
  constructor(private readonly routinesService: RoutinesService) {}

  @Get()
  findAll() {
    return this.routinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routinesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routinesService.remove(+id);
  }
}
