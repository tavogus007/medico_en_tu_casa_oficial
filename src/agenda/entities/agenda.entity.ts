import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Doctor } from './doctor.entity';
import { TrabajoSocial } from './trabajo-social.entity';
import { Admision } from './admision.entity';
import { Paciente } from './paciente.entity';

@Entity({ name: 'agenda', schema: 'mec' })
export class Agenda {
  @PrimaryGeneratedColumn({ name: 'agenda_id' })
  agendaId: number;

  @CreateDateColumn({
    name: 'registrado',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  agendaRegistrado: Date;

  @UpdateDateColumn({
    name: 'modificado',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  agendaModificado: Date;

  @Column({
    name: 'estado',
    type: 'smallint',
    default: 1,
  })
  agendaEstado: number;

  // Relaciones con subtipos
  @ManyToOne(() => Doctor, (doctor) => doctor.agendas)
  doctor: Doctor;

  @ManyToOne(() => TrabajoSocial, (trabajoSocial) => trabajoSocial.agendas)
  trabajoSocial: TrabajoSocial;

  @ManyToOne(() => Admision, (admision) => admision.agendas)
  admision: Admision;

  @ManyToOne(() => Paciente, (paciente) => paciente.agendas)
  paciente: Paciente;
}
