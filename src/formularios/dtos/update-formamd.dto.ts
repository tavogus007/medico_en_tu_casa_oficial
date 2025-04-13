import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateFormAmdDto } from './create-formamd.dto';

export class UpdateFormAmdDto extends PartialType(CreateFormAmdDto) {
  @ApiProperty({
    example: 1,
    description: 'Estado del formulario (1=Activo, -1=Inactivo)',
    required: false,
  })
  formAmdEstado?: number;

  @ApiProperty({
    example: 'Dolor de cabeza persistente',
    description: 'Motivo de la consulta médica',
    required: false,
  })
  formAmdMotivoConsulta?: string;

  @ApiProperty({
    example: 'REF-12345',
    description: 'Número de referencia',
    required: false,
  })
  formAmdNumReferencia?: string;

  @ApiProperty({
    example: 'Av. Principal 123, Lima',
    description: 'Dirección completa',
    required: false,
  })
  formAmdDireccion?: string;

  @ApiProperty({
    example: -12.04318,
    description: 'Latitud geográfica',
    required: false,
  })
  formAmdLatitud?: number;

  @ApiProperty({
    example: -77.02824,
    description: 'Longitud geográfica',
    required: false,
  })
  formAmdLongitud?: number;

  @ApiProperty({
    example: 'Cerca al parque central',
    description: 'Referencia adicional de ubicación',
    required: false,
  })
  formAmdRefAdicional?: string;

  @ApiProperty({
    example: 150.5,
    description: 'Importe del servicio',
    required: false,
  })
  formAmdImporte?: number;

  @ApiProperty({
    example: 'Tarjeta de crédito',
    description: 'Método de pago',
    required: false,
  })
  formAmdMetodoPago?: string;

  @ApiProperty({
    example: 1,
    description: 'ID de información de pago relacionada',
    required: false,
  })
  formAmdInfoPagoId?: number;
}
