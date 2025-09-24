import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Plant } from 'src/plants/entities/plant.entity';

@Entity()
export class Vital {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Plant, (plant) => plant.vitals)
  plant: Plant;

  @Column({ type: 'date', nullable: true })
  date: Date;

  @Column({ type: 'float', nullable: true })
  ndviValue: number;

  @Column({ type: 'float', nullable: true })
  hsvValue: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imageUrl: string;
}
