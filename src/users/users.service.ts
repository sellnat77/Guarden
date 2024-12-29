import { Injectable } from '@nestjs/common';
import { User } from 'src/models/users/entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  private users: User[];

  constructor(private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async initUsers() {
    this.users = [
      await this.usersRepository.createUser(1, 'john', 'changeme'),
      await this.usersRepository.createUser(2, 'maria', 'guess'),
    ];
  }

  async findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
