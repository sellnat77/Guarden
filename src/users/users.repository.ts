// users.repository.ts
import { Injectable } from '@nestjs/common';
import { User } from 'src/models/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10; // TODO: Magic Number

@Injectable()
export class UsersRepository extends Repository<User> {
  async createUser(
    userId: number,
    username: string,
    password: string,
  ): Promise<User> {
    const encryptedPassword = await bcrypt.hash(password, saltOrRounds);
    const user = new User(userId, username, encryptedPassword);
    // await this.save(user);
    return user;
  }
}
