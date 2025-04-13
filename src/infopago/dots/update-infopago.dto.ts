import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { CreateInformacionPagoDto } from './create-infopago.dto';

export class UpdateInformacionPagoDto extends PartialType(
  CreateInformacionPagoDto,
) {
  @ApiProperty({
    example: 'I',
    description: 'Estado del pago (A=Activo, I=Inactivo)',
    required: false,
  })
  infoPagoEstado?: number;

  @ApiProperty({
    example: 200.5,
    description: 'Monto del pago',
    required: false,
  })
  infoPagoMonto?: number;

  @ApiProperty({
    example: 'Pago actualizado por servicios adicionales',
    description: 'Descripción del pago',
    required: false,
  })
  infoPagoDescripcion?: string;
}
