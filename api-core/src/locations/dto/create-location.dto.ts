import { IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  parentId?: string;

  @IsString()
  createdBy: string;
}
