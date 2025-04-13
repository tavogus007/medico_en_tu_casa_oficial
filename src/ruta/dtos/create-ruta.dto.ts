import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRutaDto {
  @ApiProperty({
    example: 'Hospital Central',
    description: 'Punto de origen de la ruta',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  rutaOrigen: string;

  @ApiProperty({
    example: 'Clínica Norte',
    description: 'Punto de destino de la ruta',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  rutaDestino: string;

  @ApiProperty({
    example: 45,
    description: 'Tiempo aproximado en minutos',
    required: false,
  })
  @IsOptional()
  @IsInt()
  rutaTiempoAprox?: number;

  @ApiProperty({
    example: 1,
    description: 'ID del doctor asociado',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  doctorId: number;
}
