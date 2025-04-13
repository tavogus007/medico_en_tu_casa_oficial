import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePacienteDto } from './create-paciente.dto';

export class UpdatePacienteDto extends PartialType(CreatePacienteDto) {
  @ApiProperty({
    example: 'nuevo_usuario',
    description: 'Nombre de usuario actualizado',
    required: false,
  })
  pacienteUsuario?: string;

  @ApiProperty({
    example: '1995-05-15',
    description: 'Fecha de nacimiento actualizada',
    required: false,
  })
  pacienteFechaNac?: Date;

  @ApiProperty({
    example: 'Av. Nueva 456',
    description: 'Dirección actualizada',
    required: false,
  })
  pacienteDireccion?: string;

  @ApiProperty({
    example: '987654321',
    description: 'Celular actualizado',
    required: false,
  })
  pacienteCelular?: string;
}
