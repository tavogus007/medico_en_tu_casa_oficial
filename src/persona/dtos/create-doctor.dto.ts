import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDoctorDto {
  @ApiProperty({
    example: 1,
    description: 'ID de la persona asociada',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  personaId: number;

  @ApiProperty({
    example: 'Cardiología',
    description: 'Especialidad médica',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  doctorEspecialidad: string;

  @ApiProperty({
    example: '987654321',
    description: 'Número de celular',
    required: false,
  })
  @IsOptional()
  @IsString()
  doctorCelular?: string;

  @ApiProperty({
    example: 'dr.perez',
    description: 'Nombre de usuario único',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  doctorUsuario: string;

  @ApiProperty({
    example: 1,
    description: 'ID del vehículo asociado',
    required: false,
  })
  @IsOptional()
  @IsInt()
  vehiculoId?: number;

  @ApiProperty({
    example: 1,
    description: 'ID de la agenda asociada',
    required: false,
  })
  @IsOptional()
  @IsInt()
  agendaId?: number;

  @ApiProperty({
    example: 1,
    description: 'ID del hospital asociado',
    required: false,
  })
  @IsOptional()
  @IsInt()
  hospitalId?: number;
}
