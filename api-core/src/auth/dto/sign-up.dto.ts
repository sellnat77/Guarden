import { IsString, MinLength } from 'class-validator';
import { SignInDto } from './sign-in.dto';

export class SignUpDto extends SignInDto {
  @IsString()
  @MinLength(2)
  username: string;
}
