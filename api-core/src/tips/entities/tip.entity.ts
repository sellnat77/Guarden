import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tip {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  tip: string;
}
