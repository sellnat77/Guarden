import { IsString } from 'class-validator';

export class CreateTipDto {
  @IsString()
  tip: string;
}
