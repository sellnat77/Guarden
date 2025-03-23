import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly logger: Logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async initUsers() {
    await this.createUser({
      username: 'john',
      password: 'changeme',
      email: 'john@email.com',
    });
    await this.createUser({
      username: 'maria',
      password: 'guess',
      email: 'maria@email.com',
    });
  }

  async createUser(newUser: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(newUser);
    console.log(user);
    await this.usersRepository.upsert(user, ['email']);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findById(id: string) {
    return this.usersRepository.findOneBy({ id });
  }
  async findByUsername(username: string) {
    return this.usersRepository.findOneBy({ username });
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  async remove(userId: number) {
    await this.usersRepository.delete(userId);
  }
}
