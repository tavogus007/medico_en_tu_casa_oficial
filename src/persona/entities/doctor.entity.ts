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
import { Vehiculo } from '../../vehiculo/entities/vehiculo.entity';
import { SiisWeb } from '../../sistema/entities/siis.entity';

@Entity({ name: 'mec_doctor', schema: 'medico_en_tu_casa_v2' })
export class Doctor {
  @PrimaryColumn({ name: 'pers_id' })
  persId: number;

  @CreateDateColumn({
    name: 'doc_registrado',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  docRegistrado: Date;

  @UpdateDateColumn({
    name: 'doc_modificado',
    type: 'timestamp',
    nullable: true,
  })
  docModificado: Date | null;

  @Column({
    name: 'doc_estado',
    type: 'char',
    length: 1,
    default: 'A',
  })
  docEstado: string;

  @Column({
    name: 'doc_especialidad',
    type: 'varchar',
    length: 20,
  })
  docEspecialidad: string;

  @Column({
    name: 'doc_celular',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  docCelular: string | null;

  @Column({
    name: 'doc_usuario',
    type: 'varchar',
    length: 50,
    unique: true,
  })
  docUsuario: string;

  @ManyToOne(() => Vehiculo)
  @JoinColumn({ name: 'vehi_id' })
  vehiculo: Vehiculo;

  @ManyToOne(() => SiisWeb)
  @JoinColumn({ name: 'siis_web_id' })
  siisWeb: SiisWeb;

  @ManyToOne(() => Persona)
  @JoinColumn({ name: 'pers_id' })
  persona: Persona;
}
