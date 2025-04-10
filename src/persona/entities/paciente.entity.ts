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
import { Igob } from '../../sistema/entities/igob.entity';
import { Smartwatch } from '../../smartwatch/entities/smartwatch.entity';
import { InfoDomicilio } from '../../ruta/entities/infodom.entity';

@Entity({ name: 'mec_paciente', schema: 'medico_en_tu_casa_v2' })
export class Paciente {
  @PrimaryColumn({ name: 'pers_id' })
  persId: number;

  @ManyToOne(() => Persona)
  @JoinColumn({ name: 'pers_id' })
  persona: Persona;

  @CreateDateColumn({
    name: 'pac_registrado',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  pacRegistrado: Date;

  @UpdateDateColumn({
    name: 'pac_modificado',
    type: 'timestamp',
    nullable: true,
  })
  pacModificado: Date | null;

  @Column({
    name: 'pac_estado',
    type: 'char',
    length: 1,
    default: 'A',
  })
  pacEstado: string;

  @Column({
    name: 'pac_fecha_nac',
    type: 'date',
    nullable: true,
  })
  pacFechaNac: Date | null;

  @Column({
    name: 'pac_direccion',
    type: 'text',
    nullable: true,
  })
  pacDireccion: string | null;

  @Column({
    name: 'pac_celular',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  pacCelular: string | null;

  @Column({
    name: 'pac_solicitud_amd',
    type: 'boolean',
    default: false,
    nullable: false,
  })
  pacAtencionDomicilio: boolean;

  @ManyToOne(() => Igob, { cascade: true })
  @JoinColumn({ name: 'igob_id' })
  igob: Igob;

  @ManyToOne(() => Smartwatch, { cascade: true })
  @JoinColumn({ name: 'smart_id' })
  smartwatch: Smartwatch;

  @ManyToOne(() => InfoDomicilio, { cascade: true })
  @JoinColumn({ name: 'info_dom_id' })
  infoDomicilio: InfoDomicilio;
}
