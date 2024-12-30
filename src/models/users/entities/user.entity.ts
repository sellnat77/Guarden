import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('users')
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId?: number;

  @Column({ length: 500 })
  username: string;

  @Column('text')
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
