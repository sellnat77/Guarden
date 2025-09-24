import { IsDate, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateVitalDto {
  @IsDate()
  date: Date;

  @IsString()
  plantId: string;

  @IsNumber()
  ndviValue: number;

  @IsNumber()
  hsvValue: number;

  @IsUrl()
  imageUrl: string;
}
