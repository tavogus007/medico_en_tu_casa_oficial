import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsInt,
  IsEmail,
} from 'class-validator';

export class CreateFormAmdDto {
  @ApiProperty({
    example: -1,
    description: 'Estado del formulario (1=Activo, -1=Inactivo)',
    default: -1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  formAmdEstado?: number;

  @ApiProperty({
    example: 'Dolor de cabeza persistente',
    description: 'Motivo de la consulta médica',
    required: true,
  })
  @IsString()
  formAmdMotivoConsulta: string;

  @ApiProperty({
    example: 'REF-12345',
    description: 'Número de referencia',
    required: false,
  })
  @IsOptional()
  @IsString()
  formAmdNumReferencia?: string;

  @ApiProperty({
    example: 'Av. Principal 123, Lima',
    description: 'Dirección completa',
    required: true,
  })
  @IsString()
  formAmdDireccion: string;

  @ApiProperty({
    example: -12.04318,
    description: 'Latitud geográfica',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  formAmdLatitud?: number;

  @ApiProperty({
    example: -77.02824,
    description: 'Longitud geográfica',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  formAmdLongitud?: number;

  @ApiProperty({
    example: 'Cerca al parque central',
    description: 'Referencia adicional de ubicación',
    required: false,
  })
  @IsOptional()
  @IsString()
  formAmdRefAdicional?: string;

  @ApiProperty({
    example: 150.5,
    description: 'Importe del servicio',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  formAmdImporte?: number;

  @ApiProperty({
    example: 'Tarjeta de crédito',
    description: 'Método de pago',
    required: false,
  })
  @IsOptional()
  @IsString()
  formAmdMetodoPago?: string;

  @ApiProperty({
    example: 1,
    description: 'ID de información de pago relacionada',
    required: false,
  })
  @IsOptional()
  @IsInt()
  formAmdInfoPagoId?: number;

  @ApiProperty({
    example: 'Tipo A',
    description: 'Tipo de ciudadano',
    required: false,
  })
  @IsOptional()
  @IsString()
  formAmdTipoCiudadano?: string;

  @ApiProperty({
    example: 'ID1234567890',
    description: 'ID único del ciudadano',
    required: false,
  })
  @IsOptional()
  @IsString()
  formAmdIdCiudadano?: string;

  @ApiProperty({
    example: 'usuario@example.com',
    description: 'Correo electrónico del ciudadano',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  formAmdEmail?: string;

  @ApiProperty({
    example: 'Juancito Pinto',
    description: 'Nombre completo del ciudadano',
    required: false,
  })
  @IsOptional()
  @IsString()
  formAmdNombrePaciente?: string;
}
