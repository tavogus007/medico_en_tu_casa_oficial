import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'informacion_pago', schema: 'mec' })
export class InformacionPago {
  @PrimaryGeneratedColumn({ name: 'info_pago_id' })
  infoPagoId: number;

  @CreateDateColumn({
    name: 'registrado',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  infoPagoRegistrado: Date;

  @UpdateDateColumn({
    name: 'modificado',
    type: 'timestamp',
    nullable: true,
  })
  infoPagoModificado: Date | null;

  @Column({
    name: 'estado',
    type: 'smallint',
    default: 1,
  })
  infoPagoEstado: number;

  @Column({
    name: 'monto',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  infoPagoMonto: number | null;

  @Column({
    name: 'descripcion',
    type: 'text',
    nullable: true,
  })
  infoPagoDescripcion: string | null;
}
