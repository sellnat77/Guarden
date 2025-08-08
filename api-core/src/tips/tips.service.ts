import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tip } from './entities/tip.entity';
import { CreateTipDto } from './dto/create-tip.dto';
import { UpdateTipDto } from './dto/update-tip.dto';

@Injectable()
export class TipsService {
  constructor(
    @InjectRepository(Tip)
    private readonly tipsRepository: Repository<Tip>,
  ) {}
  async create(createTipDto: CreateTipDto) {
    const foundTip = await this.tipsRepository.findOneBy({
      tip: createTipDto.tip,
    });
    if (!foundTip) {
      const tip = this.tipsRepository.create(createTipDto);
      await this.tipsRepository.save(tip);
      return tip;
    }
    return foundTip;
  }

  async initTips() {
    const defaultTips = [
      'Water plants deeply but less frequently to encourage strong roots.',
      'Mulch around your plants to retain moisture and suppress weeds.',
      'Choose plants that thrive in your local climate and soil conditions for best growth.',
      'Use a timer or plant tags to help you remember which plants need watering and when.',
      'Experiment with different types of mulches like wood chips, straw, or compost to improve soil health.',
      'Plant flowers around the edges of your garden beds to add color and fragrance.',
      'Regularly remove dead leaves and spent blooms to encourage new growth.',
      'Consider using drip irrigation for a more efficient watering system that helps reduce water loss through evaporation.',
    ];
    for (const tip of defaultTips) {
      await this.create({
        tip,
      });
    }
  }

  async findRandom() {
    await this.initTips();
    const manager = this.tipsRepository.createQueryBuilder();
    const result = await manager.select().orderBy('RANDOM()').limit(1).getOne();
    return result;
  }

  async findAll() {
    return this.tipsRepository.find();
  }

  async update(id: string, updateTipDto: UpdateTipDto) {
    return this.tipsRepository.update({ id }, updateTipDto);
  }

  async remove(id: string) {
    return this.tipsRepository.delete({ id });
  }
}
