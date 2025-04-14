import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateInformacionPagoDto {
  @ApiProperty({
    example: 1,
    description: 'Estado del pago (1=Activo, -1=Inactivo)',
    default: 1,
    required: false,
  })
  @IsOptional()
  @IsString()
  infoPagoEstado?: number;

  @ApiProperty({
    example: 150.75,
    description: 'Monto del pago',
    required: true,
  })
  @IsNumber()
  infoPagoMonto: number;

  @ApiProperty({
    example: 'Pago por consulta médica',
    description: 'Descripción del pago',
    required: false,
  })
  @IsOptional()
  @IsString()
  infoPagoDescripcion?: string;
}
