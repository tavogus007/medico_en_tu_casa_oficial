import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsOptional,
  IsString,
  Length,
  IsInt,
  IsBoolean,
} from 'class-validator';

export class CreatePacienteDto {
  @ApiProperty({
    example: 1,
    description: 'ID de la persona (referencia a mec_persona)',
    required: true,
  })
  @IsInt()
  persId: number;

  @ApiProperty({
    example: 'A',
    description: 'Estado del paciente (A=Activo, I=Inactivo)',
    default: 'A',
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
    description: 'ID de referencia a Mec_igob',
    required: true,
  })
  @IsOptional()
  @IsInt()
  igobId?: number;

  @ApiProperty({
    example: 1,
    description: 'ID de referencia a Mec_smartwatch',
    required: false,
  })
  @IsOptional()
  @IsInt()
  smartId?: number;

  @ApiProperty({
    example: 1,
    description: 'ID de referencia a Mec_info_domicilio',
    required: false,
  })
  @IsOptional()
  @IsInt()
  infoDomId?: number;

  @ApiProperty({
    example: false,
    description: 'Indica si el paciente solicitó atención domiciliaria',
    required: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  pacAtencionDomicilio?: boolean;
}
