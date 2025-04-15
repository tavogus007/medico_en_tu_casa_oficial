import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Doctor } from 'src/persona/entities/doctor.entity';

@Entity({ name: 'form_diagnostico', schema: 'mec' })
export class FormDiagnostico {
  @PrimaryGeneratedColumn({ name: 'form_diagnostico_id' })
  formDiagnosticoId: number;

  @CreateDateColumn({
    name: 'registrado',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  formDiagnosticoRegistrado: Date;

  @UpdateDateColumn({
    name: 'modificado',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  formDiagnosticoModificado: Date;

  @Column({
    name: 'estado',
    type: 'smallint',
    default: 1,
  })
  formDiagnosticoEstado: number;

  @Column({
    name: 'frec_cardica',
    type: 'integer',
    nullable: true,
  })
  formDiagnosticoFrecCardiaca: number | null;

  @Column({
    name: 'pres_arterial',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  formDiagnosticoPresArterial: string | null;

  @Column({
    name: 'frec_respiratoria',
    type: 'integer',
    nullable: true,
  })
  formDiagnosticoFrecRespiratoria: number | null;

  @Column({
    name: 'temperatura',
    type: 'decimal',
    precision: 3,
    scale: 1,
    nullable: true,
  })
  formDiagnosticoTemperatura: number | null;

  @Column({
    name: 'saturacion_oxigeno',
    type: 'integer',
    nullable: true,
  })
  formDiagnosticoSaturacionOxigeno: number | null;

  @Column({
    name: 'diagnostico_presuntivo',
    type: 'text',
    nullable: true,
  })
  formDiagnosticoDiagnosticoPresuntivo: string | null;

  @Column({
    name: 'nombre_medicamento',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  formDiagnosticoNombreMedicamento: string | null;

  @Column({
    name: 'presentacion_medicamento',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  formDiagnosticoPresentacionMedicamento: string | null;

  @Column({
    name: 'cantidad_medicamento',
    type: 'integer',
    nullable: true,
  })
  formDiagnosticoCantidadMedicamento: number | null;

  @Column({
    name: 'posologia',
    type: 'text',
    nullable: true,
  })
  formDiagnosticoPosologia: string | null;

  @Column({
    name: 'notas_adicionales',
    type: 'text',
    nullable: true,
  })
  formDiagnosticoNotasAdicionales: string | null;

  @ManyToOne(() => Doctor, (doctor) => doctor.formDiagnosticos)
  @JoinColumn({ name: 'persona_id' })
  doctor: Doctor;
}
