import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsIn,
  IsString,
  Length,
} from 'class-validator';

export class CreateDistritoDto {
  @ApiProperty({
    description: 'Número del distrito',
    example: '5',
    maxLength: 10,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 15)
  distNro: string;

  @ApiProperty({
    description: 'Estado (1 = activo, -1 = inactivo)',
    example: 1,
    required: false,
    default: 1,
  })
  @IsOptional()
  @IsIn([1, -1], { message: 'El estado debe ser 1 (Activo) o -1 (Inactivo)' })
  distEstado?: number;

  @ApiProperty({
    description: 'ID del Macrodistrito relacionado',
    example: 1,
  })
  @IsNotEmpty()
  macroId: number;
}
