import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Distrito } from '../entities/distrito.entity';
import { HospitalMunicipal } from './hospmun.entity';

@Entity('zona', { schema: 'mec' })
export class Zona {
  @PrimaryGeneratedColumn({ name: 'zona_id' })
  zona_id: number;

  @ApiProperty({ description: 'Nombre de la zona' })
  @Column({
    name: 'nombre',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  zonaNombre: string;

  @CreateDateColumn({
    name: 'registrado',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  zonaRegistrado: Date;

  @ApiProperty({ description: 'Fecha de modificación' })
  @UpdateDateColumn({
    name: 'modificado',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  zonaModificado: Date;

  @ApiProperty({ description: 'Estado (1 = activo, -1 = inactivo)' })
  @Column({
    name: 'estado',
    type: 'smallint',
    default: 1,
  })
  zonaEstado: number;

  @ManyToOne(() => Distrito, (distrito) => distrito.zonas)
  @JoinColumn({ name: 'distrito_id' })
  @ApiProperty({ type: () => Distrito })
  distrito: Distrito;

  @OneToMany(() => HospitalMunicipal, (hospital) => hospital.zona)
  hospitales?: HospitalMunicipal[];
}
