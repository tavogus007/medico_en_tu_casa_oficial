import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Persona } from './persona.entity';
import { Smartwatch } from '../../smartwatch/entities/smartwatch.entity';
import { FormAmd } from '../../formularios/entities/formamd.entity';
import { Agenda } from '../../agenda/entities/agenda.entity';

@Entity({ name: 'paciente', schema: 'mec' })
export class Paciente {
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
  pacienteRegistrado: Date;

  @UpdateDateColumn({
    name: 'modificado',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  pacienteModificado: Date;

  @Column({
    name: 'estado',
    type: 'smallint',
    default: 1,
  })
  pacienteEstado: number;

  @Column({
    name: 'usuario',
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: true,
  })
  pacienteUsuario: string | null;

  @Column({
    name: 'fecha_nac',
    type: 'date',
    nullable: true,
  })
  pacienteFechaNac: Date | null;

  @Column({
    name: 'direccion',
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  pacienteDireccion: string | null;

  @Column({
    name: 'celular',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  pacienteCelular: string | null;

  @Column({
    name: 'codigo_siis',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  pacienteCodigoSiis: string | null;

  @Column({
    name: 'codigo_sice',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  pacienteCodigoSice: string | null;

  @ManyToOne(() => Smartwatch, (smartwatch) => smartwatch.pacientes)
  @JoinColumn({ name: 'smartwatch_id' })
  smartwatch: Smartwatch | null;

  @ManyToOne(() => FormAmd, (formAmd) => formAmd.paciente)
  @JoinColumn({ name: 'form_amd_id' })
  formAmd: FormAmd | null;

  @ManyToOne(() => Agenda, (agenda) => agenda.paciente)
  @JoinColumn({ name: 'agenda_id' })
  agenda: Agenda | null;
}
