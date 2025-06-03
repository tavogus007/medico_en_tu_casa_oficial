import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

import { PacienteService } from '../services/paciente.service';
import { Paciente } from '../entities/paciente.entity';
import { CreatePacienteDto } from '../dtos/create-paciente.dto';
import { UpdatePacienteDto } from '../dtos/update-paciente.dto';

@ApiTags('Paciente')
@Controller('paciente')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los pacientes' })
  @ApiResponse({
    status: 200,
    description: 'Lista de pacientes',
    type: [Paciente],
  })
  async findAll(): Promise<Paciente[]> {
    return this.pacienteService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un paciente por ID' })
  @ApiResponse({
    status: 200,
    description: 'Paciente encontrado',
    type: Paciente,
  })
  async findOne(@Param('id') id: number): Promise<Paciente> {
    return this.pacienteService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo paciente' })
  @ApiResponse({
    status: 201,
    description: 'Paciente creado',
    type: Paciente,
  })
  async create(@Body() dto: CreatePacienteDto): Promise<Paciente> {
    return this.pacienteService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un paciente' })
  @ApiResponse({
    status: 200,
    description: 'Paciente actualizado',
    type: Paciente,
  })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdatePacienteDto,
  ): Promise<Paciente> {
    return this.pacienteService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un paciente' })
  @ApiResponse({
    status: 204,
    description: 'Paciente eliminado',
  })
  async delete(@Param('id') id: number): Promise<void> {
    return this.pacienteService.delete(id);
  }

  @Get('by-form-amd/:formAmdId')
  @ApiOperation({ summary: 'Obtener un paciente por formAmdId' })
  @ApiParam({
    name: 'formAmdId',
    type: Number,
    description: 'ID del formulario AMD asociado',
  })
  @ApiResponse({
    status: 200,
    description: 'Paciente encontrado',
    type: Paciente,
  })
  @ApiResponse({
    status: 404,
    description: 'Paciente no encontrado',
  })
  async findByFormAmdId(
    @Param('formAmdId') formAmdId: number,
  ): Promise<Paciente> {
    return this.pacienteService.findByFormAmdId(formAmdId);
  }

  @Patch(':personaId')
  @ApiOperation({ summary: 'Actualizar parcialmente un paciente' })
  @ApiParam({
    name: 'personaId',
    type: Number,
    description: 'ID de persona del paciente',
  })
  @ApiResponse({
    status: 200,
    description: 'Paciente actualizado parcialmente',
    type: Paciente,
  })
  async updatePartial(
    @Param('personaId') personaId: number,
    @Body() dto: Partial<UpdatePacienteDto>,
  ): Promise<Paciente> {
    return this.pacienteService.updatePartial(personaId, dto);
  }
}
