@Entity()
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Plant, (plant) => plant.id)
  plant: Plant;

  @Column({
    type: 'enum',
    enum: ['water', 'fertilizer', 'pruning'],
    nullable: false,
  })
  scheduleType: 'water' | 'fertilizer' | 'pruning';

  @Column({ type: 'integer', nullable: false })
  frequency: number; // e.g., daily, weekly, monthly

  @Column({ type: 'date', nullable: true })
  startDate?: Date;

  @Column({ type: 'date', nullable: true })
  endDate?: Date;
}
