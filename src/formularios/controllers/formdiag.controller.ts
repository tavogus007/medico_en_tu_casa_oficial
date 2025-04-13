import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { FormDiagnosticoService } from '../services/formdiag.service';
import { FormDiagnostico } from '../entities/formdiag.entity';
import { CreateFormDiagnosticoDto } from '../dtos/create-formdiag.dto';
import { UpdateFormDiagnosticoDto } from '../dtos/update-formdiag.dto';

@ApiTags('Formulario Diagnóstico')
@Controller('form-diagnostico')
export class FormDiagnosticoController {
  constructor(
    private readonly formDiagnosticoService: FormDiagnosticoService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los formularios de diagnóstico' })
  @ApiResponse({
    status: 200,
    description: 'Lista de formularios',
    type: [FormDiagnostico],
  })
  async findAll(): Promise<FormDiagnostico[]> {
    return this.formDiagnosticoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un formulario por ID' })
  @ApiResponse({
    status: 200,
    description: 'Formulario encontrado',
    type: FormDiagnostico,
  })
  async findOne(@Param('id') id: number): Promise<FormDiagnostico> {
    return this.formDiagnosticoService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo formulario de diagnóstico' })
  @ApiResponse({
    status: 201,
    description: 'Formulario creado',
    type: FormDiagnostico,
  })
  async create(
    @Body() dto: CreateFormDiagnosticoDto,
  ): Promise<FormDiagnostico> {
    return this.formDiagnosticoService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un formulario de diagnóstico' })
  @ApiResponse({
    status: 200,
    description: 'Formulario actualizado',
    type: FormDiagnostico,
  })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateFormDiagnosticoDto,
  ): Promise<FormDiagnostico> {
    return this.formDiagnosticoService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un formulario de diagnóstico' })
  @ApiResponse({
    status: 204,
    description: 'Formulario eliminado',
  })
  async delete(@Param('id') id: number): Promise<void> {
    return this.formDiagnosticoService.delete(id);
  }
}
