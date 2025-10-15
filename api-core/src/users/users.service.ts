import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';

@Injectable()
export class UsersService extends TypeOrmCrudService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {
    super(usersRepository);
  }

  async registerUser(dto: SignUpDto) {
    const newUser = this.usersRepository.create(dto);
    await this.usersRepository.save(newUser);
    return newUser;
  }
}
