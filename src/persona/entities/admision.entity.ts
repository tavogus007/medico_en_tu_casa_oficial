import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Persona } from './persona.entity';

@Entity({ name: 'admision', schema: 'mec' })
export class Admision {
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
  admisionRegistrado: Date;

  @UpdateDateColumn({
    name: 'modificado',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  admisionModificado: Date;

  @Column({
    name: 'estado',
    type: 'smallint',
    default: 1,
  })
  admisionEstado: number;

  @Column({
    name: 'usuario',
    type: 'varchar',
    length: 50,
    unique: true,
  })
  admisionUsuario: string;
}
