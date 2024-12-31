import { Location } from 'src/locations/entities/location.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Plant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  species: string;
  @Column({ type: 'datetime' })
  lastWatered: Date;

  @Column({ type: 'datetime' })
  lastPruned: Date;

  @Column({ type: 'text' })
  notes: string;

  @ManyToOne(() => Location, (location: Location) => location.id)
  location: Location;
}
