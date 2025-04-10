import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonaDto } from './create-persona.dto';
import { IsString, IsOptional, Length, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePersonaDto extends PartialType(CreatePersonaDto) {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(1, 20)
  persCi?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(1, 50)
  persPaterno?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(1, 50)
  persMaterno?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(1, 50)
  persNombre?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Length(1, 1)
  @IsIn(['M', 'F', 'O'])
  persSexo?: string;

  @ApiProperty({
    description: 'Estado (1 = activo, -1 = inactivo)',
    required: false,
  })
  @IsOptional()
  @IsIn([1, -1])
  persEstado?: number;
}
