import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Persona } from './persona.entity';
import { Agenda } from 'src/agenda/entities/agenda.entity';

@Entity({ name: 'trabajo_social', schema: 'mec' })
export class TrabajoSocial {
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
  trabajoSocialRegistrado: Date;

  @UpdateDateColumn({
    name: 'modificado',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  trabajoSocialModificado: Date;

  @Column({
    name: 'estado',
    type: 'smallint',
    default: 1,
  })
  trabajoSocialEstado: number;

  @Column({
    name: 'usuario',
    type: 'varchar',
    length: 50,
    unique: true,
  })
  trabajoSocialUsuario: string;

  @OneToMany(() => Agenda, (agenda) => agenda.trabajoSocial)
  agendas: Agenda[];
}
