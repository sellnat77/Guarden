import { IsDate, IsString } from 'class-validator';

export class CreatePlantDto {
  @IsString()
  name: string;

  @IsString()
  species: string;

  @IsString()
  notes: string;

  @IsDate()
  lastWatered: Date;

  @IsDate()
  lastPruned: Date;

  @IsDate()
  lastFertilized: Date;

  @IsDate()
  lastRePotted: Date;

  @IsString()
  locationId: string;

  @IsString()
  createdBy: string;
}
