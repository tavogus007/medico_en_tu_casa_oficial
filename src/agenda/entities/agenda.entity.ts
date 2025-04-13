import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Doctor } from '../../persona/entities/doctor.entity';
import { TrabajoSocial } from '../../persona/entities/trabajoSoclal.entity';
import { Admision } from '../../persona/entities/admision.entity';
import { Paciente } from '../../persona/entities/paciente.entity';

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
  @OneToMany(() => Doctor, (doctor) => doctor.agenda)
  doctores: Doctor;

  @ManyToOne(() => TrabajoSocial, (trabajoSocial) => trabajoSocial.agendas)
  @JoinColumn({ name: 'persona_id' })
  trabajoSocial: TrabajoSocial | null;

  @ManyToOne(() => Admision, (admision) => admision.agendas)
  @JoinColumn({ name: 'persona_id' })
  admision: Admision | null;

  @OneToMany(() => Paciente, (paciente) => paciente.agenda)
  paciente: Paciente;
}
