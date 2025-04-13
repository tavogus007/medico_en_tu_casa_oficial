import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateAdmisionDto } from './create-admision.dto';

export class UpdateAdmisionDto extends PartialType(CreateAdmisionDto) {
  @ApiProperty({
    example: 'nuevo_usuario',
    description: 'Nombre de usuario actualizado',
    required: false,
  })
  admisionUsuario?: string;
}
