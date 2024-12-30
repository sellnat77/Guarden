import { Injectable, Logger } from '@nestjs/common';
import { User } from 'src/models/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { UsersRepository } from './users.repository';
import { Query } from 'typeorm/driver/Query';

@Injectable()
export class UsersService {
  private readonly logger: Logger = new Logger(UsersService.name);
  private users: User[];

  constructor(
    private usersRepository: UsersRepository,
    private dataSource: DataSource,
  ) {}

  async initUsers() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    this.users = [
      await this.usersRepository.createUser(new User('john', 'changeme')),
      await this.usersRepository.createUser(new User('maria', 'guess')),
    ];
    await queryRunner.startTransaction();
    try {
      this.users.forEach((user) => {
        console.log(user);
        queryRunner.manager.save(user);
      });
      await queryRunner.commitTransaction();
    } catch (err) {
      this.logger.error(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findById(userId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      return await queryRunner.manager.findOneById({ userId });
    } catch (err) {
      this.logger.error(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
  async findByUsername(userName: string) {
    console.log(userName);
    return this.users.find((user) => user.username === userName);
  }

  async remove(userId: number) {
    await this.usersRepository.delete(userId);
  }
}
