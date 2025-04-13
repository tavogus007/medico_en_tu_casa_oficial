import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Persona } from './persona.entity';

@Entity({ name: 'mec_admision', schema: 'medico_en_tu_casa_v2' })
export class Admisiones {
  @PrimaryColumn({ name: 'pers_id' })
  persId: number;

  @CreateDateColumn({
    name: 'admision_registrado',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  admRegistrado: Date;

  @UpdateDateColumn({
    name: 'admision_modificado',
    type: 'timestamp',
    nullable: true,
  })
  admModificado: Date | null;

  @Column({
    name: 'admision_estado',
    type: 'char',
    length: 1,
    default: 'A',
  })
  admEstado: string;

  @Column({
    name: 'admision_usuario',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  admUsuario: string | null;

  @ManyToOne(() => Persona)
  @JoinColumn({ name: 'pers_id' })
  persona: Persona;
}
