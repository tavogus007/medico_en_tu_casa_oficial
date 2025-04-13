import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'persona', schema: 'mec' })
export class Persona {
  @PrimaryGeneratedColumn({ name: 'persona_id' })
  persId: number;

  @CreateDateColumn({
    name: 'registrado',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  persRegistrado: Date;

  @ApiProperty({ description: 'Fecha de modificación' })
  @UpdateDateColumn({
    name: 'modificado',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  pers_modificado: Date;

  @ApiProperty({ description: 'Estado' })
  @Column('smallint', { name: 'estado', default: 1 })
  persEstado: number;

  @ApiProperty({ description: 'Cédula de identidad' })
  @Column('varchar', { name: 'ci', length: 20, unique: true })
  persCi: string;

  @ApiProperty({ description: 'Apellido paterno' })
  @Column('varchar', { name: 'paterno', length: 50 })
  persPaterno: string;

  @ApiProperty({ description: 'Apellido materno' })
  @Column('varchar', { name: 'materno', length: 50, nullable: true })
  persMaterno: string;

  @ApiProperty({ description: 'Nombre' })
  @Column('varchar', { name: 'nombre', length: 50 })
  persNombre: string;

  @ApiProperty({ description: 'Genero' })
  @Column('varchar', { name: 'genero', length: 1 })
  persSexo: string;
}
