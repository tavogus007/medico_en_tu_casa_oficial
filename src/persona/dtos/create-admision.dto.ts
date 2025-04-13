import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreateAdmisionDto {
  @ApiProperty({
    example: 1,
    description: 'ID de la persona asociada',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  personaId: number;

  @ApiProperty({
    example: 'admision1',
    description: 'Nombre de usuario único',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  admisionUsuario: string;
}
