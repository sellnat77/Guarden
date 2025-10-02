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
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { CrudRequest } from '@dataui/crud';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.usersService.findOneBy({ email: signInDto.email });
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

    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async signUp(req: CrudRequest, signUpDto: SignUpDto): Promise<any> {
    const user = await this.usersService.findOneBy({ email: signUpDto.email });
    if (user) {
      throw new ForbiddenException('User email already exists');
    }
    const newUser = await this.usersService.createOne(req, signUpDto); // .createOne(signUpDto);

    const payload = { sub: newUser.id, username: newUser.username };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
