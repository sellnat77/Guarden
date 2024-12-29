import {
  Injectable,
  Dependencies,
  UnauthorizedException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
@Dependencies(UsersService)
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private usersService: UsersService;
  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  async signIn(username: string, pass: string): Promise<any> {
    await this.usersService.initUsers();
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordsMatch = await bcrypt.compare(pass, user.password);
    if (!passwordsMatch) {
      throw new UnauthorizedException('Incorrect Password');
    }
    //const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return user;
  }
}
