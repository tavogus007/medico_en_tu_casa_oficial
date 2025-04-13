import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Persona } from './persona.entity';
import { Vehiculo } from '../../vehiculo/entities/vehiculo.entity';
import { Agenda } from '../../agenda/entities/agenda.entity';
import { HospitalMunicipal } from '../../geografico/entities/hospmun.entity';

@Entity({ name: 'doctor', schema: 'mec' })
export class Doctor {
  @PrimaryColumn({ name: 'persona_id' })
  personaId: number;

  @OneToOne(() => Persona)
  @JoinColumn({ name: 'persona_id' })
  persona: Persona;

  @CreateDateColumn({
    name: 'registrado',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  doctorRegistrado: Date;

  @UpdateDateColumn({
    name: 'modificado',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  doctorModificado: Date;

  @Column({
    name: 'estado',
    type: 'smallint',
    default: 1,
  })
  doctorEstado: number;

  @Column({
    name: 'especialidad',
    type: 'varchar',
    length: 100,
  })
  doctorEspecialidad: string;

  @Column({
    name: 'celular',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  doctorCelular: string | null;

  @Column({
    name: 'usuario',
    type: 'varchar',
    length: 50,
    unique: true,
  })
  doctorUsuario: string;

  @ManyToOne(() => Vehiculo, (vehiculo) => vehiculo.doctores)
  @JoinColumn({ name: 'vehiculo_id' })
  vehiculo: Vehiculo;

  @ManyToOne(() => Agenda, (agenda) => agenda.doctores)
  @JoinColumn({ name: 'agenda_id' })
  agenda: Agenda;

  @ManyToOne(() => HospitalMunicipal, (hospital) => hospital.doctores)
  @JoinColumn({ name: 'hospital_id' })
  hospital: HospitalMunicipal;
}
