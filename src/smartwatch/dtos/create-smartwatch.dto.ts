import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length, IsInt, IsNumber } from 'class-validator';

export class CreateSmartwatchDto {
  @ApiProperty({
    example: 1,
    description: 'Estado del dispositivo (1=Activo, -1=Inactivo)',
    default: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  smartEstado?: number;

  @ApiProperty({
    example: 72,
    description: 'Frecuencia cardíaca (latidos/minuto)',
    required: false,
  })
  @IsOptional()
  @IsInt()
  smartFrecCardiaca?: number;

  @ApiProperty({
    example: 120,
    description: 'Presión sistólica (mmHg)',
    required: false,
  })
  @IsOptional()
  @IsInt()
  smartPresSistolica?: number;

  @ApiProperty({
    example: 80,
    description: 'Presión diastólica (mmHg)',
    required: false,
  })
  @IsOptional()
  @IsInt()
  smartPresDiasistolica?: number;

  @ApiProperty({
    example: 98,
    description: 'Nivel de oxígeno en sangre (%)',
    required: false,
  })
  @IsOptional()
  @IsInt()
  smartPresO2?: number;

  @ApiProperty({
    example: 36.5,
    description: 'Temperatura corporal (°C)',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  smartTemperatura?: number;

  @ApiProperty({
    example: 8500,
    description: 'Pasos diarios',
    required: false,
  })
  @IsOptional()
  @IsInt()
  smartPasos?: number;

  @ApiProperty({
    example: 350,
    description: 'Calorías quemadas (kcal)',
    required: false,
  })
  @IsOptional()
  @IsInt()
  smartCaloQuem?: number;

  @ApiProperty({
    example: 7.5,
    description: 'Horas de sueño',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  smartSleepHoras?: number;

  @ApiProperty({
    example: 'Moderado',
    description: 'Nivel de estrés',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  smartNivelEstres?: string;

  @ApiProperty({
    example: 'Caminata rápida',
    description: 'Tipo de actividad física',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  smartActividadFisica?: string;
}
