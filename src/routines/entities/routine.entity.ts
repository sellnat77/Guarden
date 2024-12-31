@Entity()
export class Routine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  action: string; // e.g., "watered", "pruned", etc.

  @Column({ type: 'json' })
  plants: any[]; // list of plant IDs or names

  @Column()
  notes: string;

  @Column({ type: 'datetime' })
  scheduledAt: Date;
}
