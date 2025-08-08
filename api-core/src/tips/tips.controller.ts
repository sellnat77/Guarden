import { Controller, Get, Post, Body } from '@nestjs/common';
import { TipsService } from './tips.service';
import { CreateTipDto } from './dto/create-tip.dto';

@Controller('tips')
export class TipsController {
  constructor(private readonly tipsService: TipsService) {}

  @Post()
  create(@Body() createTipDto: CreateTipDto) {
    return this.tipsService.create(createTipDto);
  }

  @Get('random')
  findRandom() {
    return this.tipsService.findRandom();
  }

  @Get()
  findAll() {
    return this.tipsService.findAll();
  }
}
