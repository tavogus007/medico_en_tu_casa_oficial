import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateTrabajoSocialDto } from './create-trabsoc.dto';

export class UpdateTrabajoSocialDto extends PartialType(
  CreateTrabajoSocialDto,
) {
  @ApiProperty({
    example: 'tsocial_actualizado',
    description: 'Nombre de usuario actualizado',
    required: false,
  })
  trabajoSocialUsuario?: string;
}
