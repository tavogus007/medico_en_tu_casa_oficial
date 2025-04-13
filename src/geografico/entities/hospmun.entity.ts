import { ApiProperty } from '@nestjs/swagger';
import { Zona } from './zona.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Doctor } from 'src/persona/entities/doctor.entity';

@Entity({ name: 'hospital_municipal', schema: 'mec' })
export class HospitalMunicipal {
  @PrimaryGeneratedColumn({ name: 'hospital_id' })
  hospitalId: number;

  @CreateDateColumn({
    name: 'registrado',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  hospitalRegistrado: Date;

  @UpdateDateColumn({
    name: 'modificado',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  hospitalModificado: Date;

  @Column({
    name: 'estado',
    type: 'smallint',
    default: 1,
  })
  hospitalEstado: number;

  @Column({
    name: 'nombre',
    type: 'varchar',
    length: 100,
  })
  hospitalNombre: string;

  @Column({
    name: 'nivel',
    type: 'varchar',
    length: 50,
  })
  hospitalNivel: string;

  @Column({
    name: 'direccion',
    type: 'varchar',
    length: 200,
  })
  hospitalDireccion: string;

  @Column({
    name: 'telefono',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  hospitalTelefono: string | null;

  @Column({
    name: 'descripcion',
    type: 'text',
    nullable: true,
  })
  hospitalDescripcion: string | null;

  @Column({
    name: 'codigo_hospital',
    type: 'varchar',
    length: 20,
    unique: true,
  })
  hospitalCodigo: string;

  @ManyToOne(() => Zona, (zona) => zona.hospitales)
  @JoinColumn({ name: 'zona_id' })
  @ApiProperty({ type: () => Zona })
  zona: Zona;

  @OneToMany(() => Doctor, (doctor) => doctor.hospital)
  doctores?: Doctor[];
}
