import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ length: 500 })
  username: string;

  @Column('text')
  password: string;

  constructor(userId: number, username: string, password: string) {
    this.userId = userId;
    this.username = username;
    this.password = password;
  }
}
