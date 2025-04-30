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

import { FormAmdService } from '../services/formamd.service';
import { FormAmd } from '../entities/formamd.entity';
import { CreateFormAmdDto } from '../dtos/create-formamd.dto';
import { UpdateFormAmdDto } from '../dtos/update-formamd.dto';

@ApiTags('Formulario AMD')
@Controller('form-amd')
export class FormAmdController {
  constructor(private readonly formAmdService: FormAmdService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los formularios AMD' })
  @ApiResponse({
    status: 200,
    description: 'Lista de formularios AMD',
    type: [FormAmd],
  })
  async findAll(): Promise<FormAmd[]> {
    return this.formAmdService.findAll();
  }

  @Get('ciudadano/:id/existe')
  @ApiOperation({ summary: 'Verificar si ciudadano tiene ficha existente' })
  async checkFichaExistente(
    @Param('id') idCiudadano: string,
  ): Promise<boolean> {
    return this.formAmdService.hasFicha(idCiudadano);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo formulario AMD' })
  @ApiResponse({
    status: 201,
    description: 'Formulario AMD creado',
    type: FormAmd,
  })
  async create(@Body() dto: CreateFormAmdDto): Promise<FormAmd> {
    return this.formAmdService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un formulario AMD por ID' })
  @ApiResponse({
    status: 200,
    description: 'Formulario AMD encontrado',
    type: FormAmd,
  })
  async findOne(@Param('id') id: number): Promise<FormAmd> {
    return this.formAmdService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un formulario AMD' })
  @ApiResponse({
    status: 200,
    description: 'Formulario AMD actualizado',
    type: FormAmd,
  })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateFormAmdDto,
  ): Promise<FormAmd> {
    return this.formAmdService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un formulario AMD' })
  @ApiResponse({
    status: 204,
    description: 'Formulario AMD eliminado',
  })
  async delete(@Param('id') id: number): Promise<void> {
    return this.formAmdService.delete(id);
  }
}
