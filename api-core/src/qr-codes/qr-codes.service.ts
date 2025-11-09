import { Injectable } from '@nestjs/common';

@Injectable()
export class QrCodesService {
  findAll() {
    return `This action returns all qrCodes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} qrCode`;
  }

  remove(id: number) {
    return `This action removes a #${id} qrCode`;
  }
}
