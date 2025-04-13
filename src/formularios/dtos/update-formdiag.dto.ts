import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateFormDiagnosticoDto } from './create-formdiag.dto';

export class UpdateFormDiagnosticoDto extends PartialType(
  CreateFormDiagnosticoDto,
) {
  @ApiProperty({
    example: 'Nuevo diagnóstico presuntivo',
    description: 'Diagnóstico actualizado',
    required: false,
  })
  diagnosticoPresuntivo?: string;

  @ApiProperty({
    example: 'Ibuprofeno',
    description: 'Nuevo medicamento',
    required: false,
  })
  nombreMedicamento?: string;
}
