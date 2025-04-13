//import { Doctor } from 'src/persona/entities/doctor.entity';
import { Doctor } from 'src/persona/entities/doctor.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'vehiculo', schema: 'mec' }) // Cambiado el esquema a 'mec'
export class Vehiculo {
  @PrimaryGeneratedColumn({ name: 'vehiculo_id' }) // Nombre de columna actualizado
  vehiId: number;

  @CreateDateColumn({
    name: 'registrado', // Nombre simplificado
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  vehiRegistrado: Date;

  @UpdateDateColumn({
    name: 'modificado', // Nombre simplificado
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP', // Ahora tiene valor por defecto (no nullable)
  })
  vehiModificado: Date; // Ya no es nullable

  @Column({
    name: 'estado', // Nombre simplificado
    type: 'smallint',
    default: 1,
  })
  vehiEstado: number; // Cambiado a number (1 o -1)

  @Column({
    name: 'placa', // Nombre simplificado
    type: 'varchar',
    length: 20,
    unique: true,
  })
  vehiPlaca: string;

  @Column({
    name: 'descripcion', // Nombre simplificado
    type: 'text',
    nullable: true,
  })
  vehiDescripcionEstado: string | null;

  @Column({
    name: 'kilometraje', // Nombre simplificado
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  vehiKilometraje: number | null; // Cambiado a decimal(10,2)

  @OneToMany(() => Doctor, (doctor) => doctor.vehiculo)
  doctores: Doctor[];
}
