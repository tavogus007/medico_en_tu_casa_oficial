import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Doctor } from '../../persona/entities/doctor.entity';

@Entity({ name: 'ruta', schema: 'mec' })
export class Ruta {
  @PrimaryGeneratedColumn({ name: 'ruta_id' })
  rutaId: number;

  @CreateDateColumn({
    name: 'registrado',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  rutaRegistrado: Date;

  @UpdateDateColumn({
    name: 'modificado',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  rutaModificado: Date;

  @Column({
    name: 'estado',
    type: 'smallint',
    default: 1,
  })
  rutaEstado: number;

  @Column({
    name: 'origen',
    type: 'varchar',
    length: 200,
  })
  rutaOrigen: string;

  @Column({
    name: 'destino',
    type: 'varchar',
    length: 200,
  })
  rutaDestino: string;

  @Column({
    name: 'tiempo_aprox',
    type: 'integer',
    nullable: true,
  })
  rutaTiempoAprox: number | null;

  @ManyToOne(() => Doctor, (doctor) => doctor.rutas)
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;
}
