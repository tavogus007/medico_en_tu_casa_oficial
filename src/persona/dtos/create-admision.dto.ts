import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Length } from 'class-validator';

export class CreateAdmisionDto {
  @ApiProperty({
    example: 1,
    description: 'ID de la persona (referencia a mec_persona)',
    required: true,
  })
  @IsInt()
  persId: number;

  @ApiProperty({
    example: 'A',
    description: 'Estado de admision (A=Activo, I=Inactivo)',
    default: 'A',
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
