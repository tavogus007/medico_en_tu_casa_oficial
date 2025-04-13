import { Paciente } from '../../persona/entities/paciente.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'smartwatch', schema: 'mec' })
export class Smartwatch {
  @PrimaryGeneratedColumn({ name: 'smartwatch_id' })
  smartId: number;

  @CreateDateColumn({
    name: 'registrado',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  smartRegistrado: Date;

  @UpdateDateColumn({
    name: 'modificado',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  smartModificado: Date;

  @Column({
    name: 'estado',
    type: 'smallint',
    default: 1,
  })
  smartEstado: number;

  @Column({
    name: 'frec_cardiaca',
    type: 'integer',
    nullable: true,
  })
  smartFrecCardiaca: number | null;

  @Column({
    name: 'pres_sistolica',
    type: 'integer',
    nullable: true,
  })
  smartPresSistolica: number | null;

  @Column({
    name: 'pres_diasistolica',
    type: 'integer',
    nullable: true,
  })
  smartPresDiasistolica: number | null;

  @Column({
    name: 'pres_o2',
    type: 'integer',
    nullable: true,
  })
  smartPresO2: number | null;

  @Column({
    name: 'temperatura',
    type: 'decimal',
    precision: 3,
    scale: 1,
    nullable: true,
  })
  smartTemperatura: number | null;

  @Column({
    name: 'pasos',
    type: 'integer',
    nullable: true,
  })
  smartPasos: number | null;

  @Column({
    name: 'caloria_quem',
    type: 'integer',
    nullable: true,
  })
  smartCaloQuem: number | null;

  @Column({
    name: 'sleep_hours',
    type: 'decimal',
    precision: 3,
    scale: 1,
    nullable: true,
  })
  smartSleepHoras: number | null;

  @Column({
    name: 'nivel_estres',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  smartNivelEstres: string | null;

  @Column({
    name: 'actividad_fisica',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  smartActividadFisica: string | null;

  @OneToMany(() => Paciente, (paciente) => paciente.smartwatch)
  pacientes: Paciente[];
}
