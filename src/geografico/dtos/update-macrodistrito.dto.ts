import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateMacrodistritoDto } from './create-macrodistrito.dto';
import { IsString, MaxLength, IsIn, IsOptional } from 'class-validator';

export class UpdateMacrodistritoDto extends PartialType(
  CreateMacrodistritoDto,
) {
  @ApiProperty({
    description: 'Nombre del macrodistrito',
    example: 'Centro',
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'El nombre no puede tener más de 100 caracteres' })
  macroNombre?: string;

  @ApiProperty({
    description: 'Estado (1 = activo, -1 = inactivo)',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsIn([1, -1], { message: 'El estado debe ser 1 (Activo) o -1 (Inactivo)' })
  macroEstado?: number;
}
