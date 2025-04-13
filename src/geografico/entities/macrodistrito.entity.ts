import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Distrito } from './distrito.entity';

@Entity('macrodistrito', { schema: 'mec' })
export class Macrodistrito {
  @PrimaryGeneratedColumn({ name: 'macro_id' })
  macro_id: number;

  @ApiProperty({ description: 'Nombre del macrodistrito' })
  @Column({
    name: 'nombre',
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  macroNombre: string;

  @CreateDateColumn({
    name: 'registrado',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  macroRegistrado: Date;

  @ApiProperty({ description: 'Fecha de modificación' })
  @UpdateDateColumn({
    name: 'modificado',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  macroModificado: Date;

  @ApiProperty({ description: 'Estado (1 = activo, -1 = inactivo)' })
  @Column({
    name: 'estado',
    type: 'smallint',
    default: 1,
  })
  macroEstado: number;

  @OneToMany(() => Distrito, (distrito) => distrito.macrodistrito)
  distritos?: Distrito[];
}
