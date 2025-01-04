import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

const SALT_OR_ROUNDS = 10;

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ length: 500, unique: true })
  username: string;

  @Column('text')
  password: string;

  @Column('text', { unique: true })
  email: string;

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, SALT_OR_ROUNDS);
    }
  }

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
