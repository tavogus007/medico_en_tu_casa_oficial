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

import { Macrodistrito } from './macrodistrito.entity';
import { Zona } from './zona.entity';

@Entity('distrito', { schema: 'mec' })
export class Distrito {
  @PrimaryGeneratedColumn({ name: 'distrito_id' })
  dist_id: number;

  @ApiProperty({ description: 'Número del distrito' })
  @Column({
    name: 'nro',
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  distNro: string;

  @CreateDateColumn({
    name: 'registrado',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  distRegistrado: Date;

  @ApiProperty({ description: 'Fecha de modificación' })
  @UpdateDateColumn({
    name: 'modificado',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  distModificado: Date;

  @ApiProperty({ description: 'Estado (1 = activo, -1 = inactivo)' })
  @Column({
    name: 'estado',
    type: 'smallint',
    default: 1,
  })
  distEstado: number;

  @ManyToOne(() => Macrodistrito, (macrodistrito) => macrodistrito.distritos)
  @JoinColumn({ name: 'macro_id' })
  @ApiProperty({ type: () => Macrodistrito })
  macrodistrito: Macrodistrito;

  @OneToMany(() => Zona, (zona) => zona.distrito)
  @ApiProperty({ type: () => Zona })
  zonas: Zona[];
}
