// update-paciente.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdatePacienteDto {
  @ApiProperty({
    example: 'A',
    description: 'Estado del paciente (A=Activo, I=Inactivo)',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 1)
  pacEstado?: string;

  @ApiProperty({
    example: '1990-01-15',
    description: 'Fecha de nacimiento (YYYY-MM-DD)',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  pacFechaNac?: string;

  @ApiProperty({
    example: 'Calle Falsa 123',
    description: 'Dirección del paciente',
    required: false,
  })
  @IsOptional()
  @IsString()
  pacDireccion?: string;

  @ApiProperty({
    example: '3001234567',
    description: 'Número de celular',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  pacCelular?: string;

  @ApiProperty({
    example: 1,
    description: 'ID de referencia para el Smartwatch',
    required: false,
  })
  @IsOptional()
  smartId?: number;

  @ApiProperty({
    example: true,
    description: 'Actualiza el estado de solicitud de atención domiciliaria',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  pacAtencionDomicilio?: boolean;

  // ¡No incluyas persId, igobId, smartId, ni infoDomId!
}
