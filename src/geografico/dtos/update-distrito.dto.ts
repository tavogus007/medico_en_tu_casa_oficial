import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateDistritoDto } from './create-distrito.dto';
import { IsString, IsOptional, Length, IsIn } from 'class-validator';

export class UpdateDistritoDto extends PartialType(CreateDistritoDto) {
  @ApiProperty({
    description: 'Número del distrito',
    example: '5',
    maxLength: 10,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 10)
  distNro?: string;

  @ApiProperty({
    description: 'Estado (1 = activo, -1 = inactivo)',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsIn([1, -1])
  distEstado?: number;
}
