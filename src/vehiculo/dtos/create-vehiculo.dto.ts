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
    example: 'A',
    description: 'Estado del vehículo (A=Activo, I=Inactivo)',
    default: 'A',
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
