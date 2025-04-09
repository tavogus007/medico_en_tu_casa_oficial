import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Length, IsInt } from 'class-validator';

export class UpdateVehiculoDto {
  @ApiProperty({
    example: 'XYZ-789',
    description: 'Placa del vehículo (única)',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  vehiPlaca?: string;

  @ApiProperty({
    example: 'I',
    description: 'Estado del vehículo (A=Activo, I=Inactivo)',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 1)
  vehiEstado?: string;

  @ApiProperty({
    example: 'Vehículo en mantenimiento',
    description: 'Descripción del estado del vehículo',
    required: false,
  })
  @IsOptional()
  @IsString()
  vehiDescripcionEstado?: string;

  @ApiProperty({
    example: 20000,
    description: 'Kilometraje actual del vehículo',
    required: false,
  })
  @IsOptional()
  @IsInt()
  vehiKilometraje?: number;
}
