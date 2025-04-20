import { Location } from 'src/locations/entities/location.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity()
export class Plant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  species: string;

  @Column({ type: 'timestamptz', nullable: true })
  lastWatered: Date;

  @Column({ type: 'timestamptz', nullable: true })
  lastPruned: Date;

  @Column({ type: 'timestamptz', nullable: true })
  lastFertilized: Date;

  @Column({ type: 'timestamptz', nullable: true })
  lastRePotted: Date;

  @Column({ type: 'text' })
  notes: string;

  @ManyToOne(() => Location, (location) => location.plants)
  @JoinTable({ name: 'locationId' })
  location: Relation<Location>;

  @ManyToOne(() => User, (user) => user.plants)
  @JoinColumn()
  createdBy: string;
}
