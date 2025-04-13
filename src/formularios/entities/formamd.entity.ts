import { InformacionPago } from '../../infopago/entities/infopago.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'form_amd', schema: 'mec' })
export class FormAmd {
  @PrimaryGeneratedColumn({ name: 'form_amd_id' })
  formAmdId: number;

  @CreateDateColumn({
    name: 'registrado',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  formAmdRegistrado: Date;

  @UpdateDateColumn({
    name: 'modificado',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  formAmdModificado: Date;

  @Column({
    name: 'estado',
    type: 'smallint',
    default: -1,
  })
  formAmdEstado: number;

  @Column({
    name: 'motivo_consulta',
    type: 'text',
  })
  formAmdMotivoConsulta: string;

  @Column({
    name: 'num_referencia',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  formAmdNumReferencia: string | null;

  @Column({
    name: 'direccion',
    type: 'varchar',
    length: 200,
  })
  formAmdDireccion: string;

  @Column({
    name: 'latitud',
    type: 'decimal',
    precision: 10,
    scale: 6,
    nullable: true,
  })
  formAmdLatitud: number | null;

  @Column({
    name: 'longitud',
    type: 'decimal',
    precision: 10,
    scale: 6,
    nullable: true,
  })
  formAmdLongitud: number | null;

  @Column({
    name: 'ref_adicional',
    type: 'text',
    nullable: true,
  })
  formAmdRefAdicional: string | null;

  @Column({
    name: 'importe',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  formAmdImporte: number | null;

  @Column({
    name: 'metodo_pago',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  formAmdMetodoPago: string | null;

  @ManyToOne(
    () => InformacionPago,
    (informacionPago) => informacionPago.infoPagoId,
  )
  @Column({ name: 'info_pago_id', nullable: true })
  formAmdInfoPagoId: number | null;
}
