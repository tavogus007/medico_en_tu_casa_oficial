import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreateTrabajoSocialDto {
  @ApiProperty({
    example: 1,
    description: 'ID de la persona asociada',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  personaId: number;

  @ApiProperty({
    example: 'tsocial1',
    description: 'Nombre de usuario único',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  trabajoSocialUsuario: string;
}
