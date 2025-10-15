import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  JoinTable,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Location } from 'src/locations/entities/location.entity';
import { Plant } from 'src/plants/entities/plant.entity';

const SALT_OR_ROUNDS = 10;

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ length: 500, unique: true, nullable: true })
  username: string;

  @Column('text')
  password: string;

  @Column('text', { unique: true })
  email: string;

  @OneToMany(() => Location, (location) => location.createdBy)
  @JoinTable({
    name: 'createdBy',
    joinColumn: { name: 'createdBy' },
    inverseJoinColumn: { name: 'id' },
  })
  locations: Location[];

  @OneToMany(() => Plant, (plant) => plant.createdBy)
  @JoinTable({
    name: 'createdBy',
    joinColumn: { name: 'createdBy' },
    inverseJoinColumn: { name: 'id' },
  })
  plants: Plant[];

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
