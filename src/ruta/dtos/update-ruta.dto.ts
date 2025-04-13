import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateRutaDto } from './create-ruta.dto';

export class UpdateRutaDto extends PartialType(CreateRutaDto) {
  @ApiProperty({
    example: 'Nuevo Origen',
    description: 'Origen actualizado',
    required: false,
  })
  rutaOrigen?: string;

  @ApiProperty({
    example: 'Nuevo Destino',
    description: 'Destino actualizado',
    required: false,
  })
  rutaDestino?: string;
}
