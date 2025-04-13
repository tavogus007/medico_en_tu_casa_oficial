import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsIn,
} from 'class-validator';

export class CreateMacrodistritoDto {
  @ApiProperty({
    description: 'Nombre del macrodistrito',
    example: 'Centro',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'El nombre no puede tener más de 100 caracteres' })
  macroNombre: string;

  @ApiProperty({
    description: 'Estado (1 = activo, -1 = inactivo)',
    example: 1,
    required: false,
    default: 1,
  })
  @IsOptional()
  @IsIn([1, -1], { message: 'El estado debe ser 1 (Activo) o -1 (Inactivo)' })
  macroEstado?: number;
}
