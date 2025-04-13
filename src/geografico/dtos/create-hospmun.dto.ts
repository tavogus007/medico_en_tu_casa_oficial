import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateHospitalMunicipalDto {
  @ApiProperty({
    example: 1,
    description: 'Estado del hospital (1=Activo, -1=Inactivo)',
    default: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  hospitalEstado?: number;

  @ApiProperty({
    example: 'Hospital Municipal de Lima',
    description: 'Nombre del hospital',
    required: true,
  })
  @IsString()
  hospitalNombre: string;

  @ApiProperty({
    example: 'III',
    description: 'Nivel del hospital',
    required: true,
  })
  @IsString()
  hospitalNivel: string;

  @ApiProperty({
    example: 'Av. Brasil 600, Lima',
    description: 'Dirección del hospital',
    required: true,
  })
  @IsString()
  hospitalDireccion: string;

  @ApiProperty({
    example: '012345678',
    description: 'Teléfono del hospital',
    required: false,
  })
  @IsOptional()
  @IsString()
  hospitalTelefono?: string;

  @ApiProperty({
    example: 'Hospital especializado en emergencias',
    description: 'Descripción del hospital',
    required: false,
  })
  @IsOptional()
  @IsString()
  hospitalDescripcion?: string;

  @ApiProperty({
    example: 'HM-LIMA-001',
    description: 'Código único del hospital',
    required: true,
  })
  @IsString()
  hospitalCodigo: string;

  @ApiProperty({
    example: 1,
    description: 'ID de la zona donde se ubica el hospital',
    required: true,
  })
  @IsInt()
  hospitalZonaId: number;
}
