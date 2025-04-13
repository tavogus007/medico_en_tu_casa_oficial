import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsIn, IsString } from 'class-validator';

export class CreateZonaDto {
  @ApiProperty({
    description: 'Nombre de la zona',
    example: 'Zona Norte',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  zonaNombre: string;

  @ApiProperty({
    description: 'Estado (1 = activo, -1 = inactivo)',
    example: 1,
    required: false,
    default: 1,
  })
  @IsOptional()
  @IsIn([1, -1], { message: 'El estado debe ser 1 (Activo) o -1 (Inactivo)' })
  zonaEstado?: number;

  @ApiProperty({
    description: 'ID del Distrito relacionado',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  distId: number;
}
