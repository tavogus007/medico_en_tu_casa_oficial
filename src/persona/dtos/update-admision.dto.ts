import { PartialType } from '@nestjs/mapped-types';
import { CreateAdmisionDto } from './create-admision.dto';
import { IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAdmisionDto extends PartialType(CreateAdmisionDto) {
  @ApiProperty({
    example: 'A',
    description: 'Estado de admision (A=Activo, I=Inactivo)',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 1)
  admEstado?: string;

  @ApiProperty({
    example: 'mgarcia',
    description: 'Nombre de usuario de admision',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  admUsuario?: string;
}
