import { PartialType } from '@nestjs/mapped-types';
import { CreateTrabajoSocialDto } from './create-trabsoc.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateTrabajoSocialDto extends PartialType(
  CreateTrabajoSocialDto,
) {
  @ApiProperty({
    example: 'A',
    description: 'Estado del trabajo social (A=Activo, I=Inactivo)',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 1)
  tsEstado?: string;

  @ApiProperty({
    example: 'mgarcia',
    description: 'Usuario que modifica el trabajo social',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  tsUsuario?: string;
}
