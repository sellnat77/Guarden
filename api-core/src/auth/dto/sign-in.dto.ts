import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @IsString()
  @MinLength(6)
  password: string;

  @IsEmail()
  email: string;
}
