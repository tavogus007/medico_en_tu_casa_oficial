import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, IsIn } from 'class-validator';

export class CreatePersonaDto {
  @ApiProperty({
    example: '9977865',
    description: 'Carnet de identiad (sin extension)',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  persCi: string;

  @ApiProperty({
    example: 'Gonzales',
    description: 'Apellido paterno',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  persPaterno: string;

  @ApiProperty({
    example: 'Gomez',
    description: 'Apellido materno',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  persMaterno: string;

  @ApiProperty({
    example: 'Ramiro',
    description: 'Nombres',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  persNombre: string;

  @ApiProperty({
    example: 'M',
    description: 'Sexo (M=Masculino, F=Femenino, O=Otro)',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 1)
  @IsIn(['M', 'F', 'O'])
  persSexo: string;
}
