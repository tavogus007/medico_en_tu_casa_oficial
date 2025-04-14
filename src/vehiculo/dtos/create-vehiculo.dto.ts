import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  Length,
  IsOptional,
  IsInt,
} from 'class-validator';

export class CreateVehiculoDto {
  @ApiProperty({
    example: 'ABC-123',
    description: 'Placa del vehículo (única)',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  vehiPlaca: string;

  @ApiProperty({
    example: 1,
    description: 'Estado del vehículo (1=Activo, -1=Inactivo)',
    default: 1,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 1)
  vehiEstado?: number;

  @ApiProperty({
    example: 'Vehículo en buen estado, con detalles menores en la pintura',
    description: 'Descripción del estado del vehículo',
    required: false,
  })
  @IsOptional()
  @IsString()
  vehiDescripcionEstado?: string;

  @ApiProperty({
    example: 15000,
    description: 'Kilometraje actual del vehículo',
    required: false,
  })
  @IsOptional()
  @IsInt()
  vehiKilometraje?: number;
}
