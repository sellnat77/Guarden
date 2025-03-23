import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Plant } from 'src/plants/entities/plant.entity';

@Entity()
export class Vital {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Plant, (plant) => plant.id)
  plant: Plant;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @Column({ type: 'float', nullable: false })
  ndviValue: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  imageUrl: string;
}
