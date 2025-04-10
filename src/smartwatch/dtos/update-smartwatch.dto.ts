import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateSmartwatchDto } from './create-smartwatch.dto';

export class UpdateSmartwatchDto extends PartialType(CreateSmartwatchDto) {
  @ApiProperty({
    example: 1,
    description: 'Estado del dispositivo (1=Activo, -1=Inactivo)',
    required: false,
  })
  smartEstado?: number;

  @ApiProperty({
    example: 72,
    description: 'Frecuencia cardíaca (latidos/minuto)',
    required: false,
  })
  smartFrecCardiaca?: number;

  @ApiProperty({
    example: 120,
    description: 'Presión sistólica (mmHg)',
    required: false,
  })
  smartPresSistolica?: number;

  @ApiProperty({
    example: 80,
    description: 'Presión diastólica (mmHg)',
    required: false,
  })
  smartPresDiasistolica?: number;

  @ApiProperty({
    example: 98,
    description: 'Nivel de oxígeno en sangre (%)',
    required: false,
  })
  smartPresO2?: number;

  @ApiProperty({
    example: 36.5,
    description: 'Temperatura corporal (°C)',
    required: false,
  })
  smartTemperatura?: number;

  @ApiProperty({
    example: 8500,
    description: 'Pasos diarios',
    required: false,
  })
  smartPasos?: number;

  @ApiProperty({
    example: 350,
    description: 'Calorías quemadas (kcal)',
    required: false,
  })
  smartCaloQuem?: number;

  @ApiProperty({
    example: 7.5,
    description: 'Horas de sueño',
    required: false,
  })
  smartSleepHoras?: number;

  @ApiProperty({
    example: 'Moderado',
    description: 'Nivel de estrés',
    required: false,
  })
  smartNivelEstres?: string;

  @ApiProperty({
    example: 'Caminata rápida',
    description: 'Tipo de actividad física',
    required: false,
  })
  smartActividadFisica?: string;
}
