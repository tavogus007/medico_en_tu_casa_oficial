import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from './create-doctor.dto';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
  @ApiProperty({
    example: 'Neurología',
    description: 'Nueva especialidad médica',
    required: false,
  })
  doctorEspecialidad?: string;

  @ApiProperty({
    example: 'dr.perez.actualizado',
    description: 'Nuevo nombre de usuario',
    required: false,
  })
  doctorUsuario?: string;
}
