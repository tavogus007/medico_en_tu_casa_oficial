import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class CreateAgendaDto {
  @ApiProperty({
    example: 1,
    description: 'Estado de la agenda (1=Activo, -1=Inactivo)',
    default: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  agendaEstado?: number;

  @ApiProperty({
    example: 1,
    description: 'ID del doctor (opcional)',
    required: false,
  })
  @IsOptional()
  @IsInt()
  doctorId?: number;

  @ApiProperty({
    example: 1,
    description: 'ID de trabajo social (opcional)',
    required: false,
  })
  @IsOptional()
  @IsInt()
  trabajoSocialId?: number;

  @ApiProperty({
    example: 1,
    description: 'ID de admisión (opcional)',
    required: false,
  })
  @IsOptional()
  @IsInt()
  admisionId?: number;

  @ApiProperty({
    example: 1,
    description: 'ID del paciente (opcional)',
    required: false,
  })
  @IsOptional()
  @IsInt()
  pacienteId?: number;
}
