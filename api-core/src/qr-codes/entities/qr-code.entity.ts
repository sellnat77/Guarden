import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class QRCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  qrCodeString: string;

  @Column()
  routineId: string; // foreign key to Routine.id

  @Column({ type: 'datetime' })
  scannedAt: Date;

  @Column()
  status: string; // e.g., "scanned", "invalid", etc.
}
