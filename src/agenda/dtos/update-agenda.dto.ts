import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateAgendaDto } from './create-agenda.dto';

export class UpdateAgendaDto extends PartialType(CreateAgendaDto) {
  @ApiProperty({
    example: -1,
    description: 'Estado de la agenda (1=Activo, -1=Inactivo)',
    required: false,
  })
  agendaEstado?: number;
}
