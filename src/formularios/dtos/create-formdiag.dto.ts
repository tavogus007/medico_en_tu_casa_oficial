import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateFormDiagnosticoDto {
  @ApiProperty({
    example: 1,
    description: 'ID de la persona asociada',
    required: true,
  })
  @IsInt()
  personaId: number;

  @ApiProperty({
    example: 80,
    description: 'Frecuencia cardíaca (latidos/minuto)',
    required: false,
  })
  @IsOptional()
  @IsInt()
  frecCardiaca?: number;

  @ApiProperty({
    example: '120/80',
    description: 'Presión arterial (mmHg)',
    required: false,
  })
  @IsOptional()
  @IsString()
  presArterial?: string;

  @ApiProperty({
    example: 16,
    description: 'Frecuencia respiratoria (respiraciones/minuto)',
    required: false,
  })
  @IsOptional()
  @IsInt()
  frecRespiratoria?: number;

  @ApiProperty({
    example: 36.5,
    description: 'Temperatura corporal (°C)',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  temperatura?: number;

  @ApiProperty({
    example: 98,
    description: 'Saturación de oxígeno (%)',
    required: false,
  })
  @IsOptional()
  @IsInt()
  saturacionOxigeno?: number;

  @ApiProperty({
    example: 'Hipertensión arterial',
    description: 'Diagnóstico presuntivo',
    required: false,
  })
  @IsOptional()
  @IsString()
  diagnosticoPresuntivo?: string;

  @ApiProperty({
    example: 'Paracetamol',
    description: 'Nombre del medicamento',
    required: false,
  })
  @IsOptional()
  @IsString()
  nombreMedicamento?: string;

  @ApiProperty({
    example: 'Tabletas 500mg',
    description: 'Presentación del medicamento',
    required: false,
  })
  @IsOptional()
  @IsString()
  presentacionMedicamento?: string;

  @ApiProperty({
    example: 20,
    description: 'Cantidad de medicamento',
    required: false,
  })
  @IsOptional()
  @IsInt()
  cantidadMedicamento?: number;

  @ApiProperty({
    example: '1 tableta cada 8 horas por 5 días',
    description: 'Posología del medicamento',
    required: false,
  })
  @IsOptional()
  @IsString()
  posologia?: string;

  @ApiProperty({
    example: 'Paciente con antecedentes de alergias',
    description: 'Notas adicionales',
    required: false,
  })
  @IsOptional()
  @IsString()
  notasAdicionales?: string;
}
