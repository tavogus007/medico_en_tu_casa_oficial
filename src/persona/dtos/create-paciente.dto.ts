import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreatePacienteDto {
  @ApiProperty({
    example: 1,
    description: 'ID de la persona asociada',
    required: true,
  })
  @IsInt()
  personaId: number;

  @ApiProperty({
    example: 'paciente1',
    description: 'Nombre de usuario único',
    required: false,
  })
  @IsOptional()
  @IsString()
  pacienteUsuario?: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Fecha de nacimiento',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  pacienteFechaNac?: Date;

  @ApiProperty({
    example: 'Av. Principal 123',
    description: 'Dirección del paciente',
    required: false,
  })
  @IsOptional()
  @IsString()
  pacienteDireccion?: string;

  @ApiProperty({
    example: '987654321',
    description: 'Número de celular',
    required: false,
  })
  @IsOptional()
  @IsString()
  pacienteCelular?: string;

  @ApiProperty({
    example: 'SIIS12345',
    description: 'Código SIIs',
    required: false,
  })
  @IsOptional()
  @IsString()
  pacienteCodigoSiis?: string;

  @ApiProperty({
    example: 'SICE54321',
    description: 'Código SICE',
    required: false,
  })
  @IsOptional()
  @IsString()
  pacienteCodigoSice?: string;

  @ApiProperty({
    example: 1,
    description: 'ID del smartwatch asociado',
    required: false,
  })
  @IsOptional()
  @IsInt()
  smartwatchId?: number;

  @ApiProperty({
    example: 1,
    description: 'ID del formulario AMD asociado',
    required: false,
  })
  @IsOptional()
  @IsInt()
  formAmdId?: number;

  @ApiProperty({
    example: 1,
    description: 'ID de la agenda asociada',
    required: false,
  })
  @IsOptional()
  @IsInt()
  agendaId?: number;
}
