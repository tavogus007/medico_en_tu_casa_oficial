import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateHospitalMunicipalDto } from './create-hospmun.dto';

export class UpdateHospitalMunicipalDto extends PartialType(
  CreateHospitalMunicipalDto,
) {
  @ApiProperty({
    example: -1,
    description: 'Estado del hospital (1=Activo, -1=Inactivo)',
    required: false,
  })
  hospitalEstado?: number;

  @ApiProperty({
    example: 'Hospital Municipal de Lima Norte',
    description: 'Nombre del hospital',
    required: false,
  })
  hospitalNombre?: string;

  @ApiProperty({
    example: 'II',
    description: 'Nivel del hospital',
    required: false,
  })
  hospitalNivel?: string;

  @ApiProperty({
    example: 'Av. Túpac Amaru 123, Lima',
    description: 'Dirección del hospital',
    required: false,
  })
  hospitalDireccion?: string;

  @ApiProperty({
    example: '098765432',
    description: 'Teléfono del hospital',
    required: false,
  })
  hospitalTelefono?: string;

  @ApiProperty({
    example: 'Hospital con especialidad en pediatría',
    description: 'Descripción del hospital',
    required: false,
  })
  hospitalDescripcion?: string;

  @ApiProperty({
    example: 'HM-LIMA-002',
    description: 'Código único del hospital',
    required: false,
  })
  hospitalCodigo?: string;

  @ApiProperty({
    example: 2,
    description: 'ID de la zona donde se ubica el hospital',
    required: false,
  })
  hospitalZonaId?: number;
}
