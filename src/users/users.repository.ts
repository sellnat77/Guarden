// users.repository.ts
import { Injectable } from '@nestjs/common';
import { User } from 'src/models/users/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

const saltOrRounds = 10; // TODO: Magic Number

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(
    @InjectRepository(User) repository: Repository<User>,
    private dataSource: DataSource,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createUser(newUser: User): Promise<User> {
    console.log(newUser.password);
    const encryptedPassword = await bcrypt.hash(newUser.password, saltOrRounds);
    newUser.password = encryptedPassword;
    return newUser;
  }
}
