import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length, IsInt } from 'class-validator';

export class UpdateDoctorDto {
  @ApiProperty({
    example: 'A',
    description: 'Estado del doctor (A=Activo, I=Inactivo)',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 1)
  docEstado?: string;

  @ApiProperty({
    example: 'Pediatría',
    description: 'Especialidad del doctor',
    required: false,
  })
  @IsOptional()
  @IsString()
  docEspecialidad?: string;

  @ApiProperty({
    example: '77754321',
    description: 'Número de celular del doctor',
    required: false,
  })
  @IsOptional()
  @IsString()
  docCelular?: string;

  @ApiProperty({
    example: 'mgarcia2023',
    description: 'Nombre de usuario del doctor',
    required: false,
  })
  @IsOptional()
  @IsString()
  docUsuario?: string;

  @ApiProperty({
    example: 2,
    description: 'ID del vehículo asignado',
    required: false,
  })
  @IsOptional()
  @IsInt()
  vehiId?: number;

  @ApiProperty({
    example: 2,
    description: 'ID del registro en SIIs Web',
    required: false,
  })
  @IsOptional()
  @IsInt()
  siisWebId?: number;
}
