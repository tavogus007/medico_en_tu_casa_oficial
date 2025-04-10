import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Length } from 'class-validator';

export class CreateDoctorDto {
  @ApiProperty({
    example: 1,
    description: 'ID de la persona (referencia a mec_persona)',
    required: true,
  })
  @IsInt()
  persId: number;

  @ApiProperty({
    example: 'A',
    description: 'Estado del doctor (A=Activo, I=Inactivo)',
    default: 'A',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 1)
  docEstado?: string;

  @ApiProperty({
    example: 'Cardiología',
    description: 'Especialidad del doctor',
    required: true,
  })
  @IsString()
  docEspecialidad: string;

  @ApiProperty({
    example: '77712345',
    description: 'Número de celular del doctor',
    required: false,
  })
  @IsOptional()
  @IsString()
  docCelular?: string;

  @ApiProperty({
    example: 'mgarcia',
    description: 'Nombre de usuario del doctor',
    required: false,
  })
  @IsOptional()
  @IsString()
  docUsuario?: string;

  @ApiProperty({
    example: 1,
    description: 'ID del vehículo asignado',
    required: false,
  })
  @IsOptional()
  @IsInt()
  vehiId?: number;

  @ApiProperty({
    example: 1,
    description: 'ID del registro en SIIs Web',
    required: false,
  })
  @IsOptional()
  @IsInt()
  siisWebId?: number;
}
