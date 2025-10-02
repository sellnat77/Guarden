import { Plant } from 'src/plants/entities/plant.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @ManyToOne(() => Location, (location) => location.sublocations, {
    nullable: true,
  })
  @JoinColumn({ name: 'parentId' })
  parent: Location;

  @OneToMany(() => Location, (location) => location.parent)
  sublocations: Location[];

  @Column({ nullable: true })
  parentId: string;

  @ManyToOne(() => UserEntity, (user) => user.locations)
  createdBy: string;

  @OneToMany(() => Plant, (plant) => plant.location)
  plants: Relation<Plant>[];
}
