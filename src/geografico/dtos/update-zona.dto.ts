import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateZonaDto } from './create-zona.dto';
import { IsOptional, IsIn, IsString } from 'class-validator';

export class UpdateZonaDto extends PartialType(CreateZonaDto) {
  @ApiProperty({
    description: 'Nombre de la zona',
    example: 'Zona Norte',
    required: false,
  })
  @IsOptional()
  @IsString()
  zonaNombre?: string;

  @ApiProperty({
    description: 'Estado (1 = activo, -1 = inactivo)',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsIn([1, -1])
  zonaEstado?: number;
}
