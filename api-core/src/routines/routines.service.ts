import { Injectable } from '@nestjs/common';

@Injectable()
export class RoutinesService {
  findAll() {
    return `This action returns all routines`;
  }

  findOne(id: number) {
    return `This action returns a #${id} routine`;
  }

  remove(id: number) {
    return `This action removes a #${id} routine`;
  }
}
