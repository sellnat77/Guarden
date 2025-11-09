import { Controller, Get, Param, Delete } from '@nestjs/common';
import { QrCodesService } from './qr-codes.service';

@Controller('qr-codes')
export class QrCodesController {
  constructor(private readonly qrCodesService: QrCodesService) {}

  @Get()
  findAll() {
    return this.qrCodesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.qrCodesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.qrCodesService.remove(+id);
  }
}
