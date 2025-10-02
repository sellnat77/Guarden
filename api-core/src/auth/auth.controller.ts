import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from 'src/users/decorators/user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  CrudController,
  CrudRequest,
  ParsedBody,
  ParsedRequest,
} from '@dataui/crud';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@ParsedRequest() req: CrudRequest, @Body() signUpDto: SignUpDto) {
    console.log(signUpDto);
    return this.authService.signUp(req, signUpDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: Request, @User() user: UserEntity) {
    return user;
  }
}
