import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  Logger,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    console.log('test+++++++');
    await this.usersService.initUsers();
    const user = await this.usersService.findByUsername(signInDto.username);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordsMatch = await bcrypt.compare(
      signInDto.password,
      user.password,
    );
    if (!passwordsMatch) {
      throw new UnauthorizedException('Incorrect Password');
    }

    const payload = { sub: user.id, username: user.username };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async signUp(signUpDto: SignUpDto): Promise<any> {
    const user = await this.usersService.findByUsername(signUpDto.username);
    if (user) {
      throw new ForbiddenException('Username already exists');
    }
    const newUser = await this.usersService.createUser(signUpDto);

    const payload = { sub: newUser.id, username: newUser.username };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
