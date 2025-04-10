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
import { PacienteService } from '../services/paciente.service';
import { Paciente } from '../entities/paciente.entity';
import { CreatePacienteDto } from '../dtos/create-paciente.dto';
import { UpdatePacienteDto } from '../dtos/update-paciente.dto';

@ApiTags('Pacientes')
@Controller('pacientes')
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

  @Post()
  @ApiOperation({ summary: 'Registrar un nuevo paciente' })
  @ApiResponse({
    status: 201,
    description: 'Paciente creado',
    type: Paciente,
  })
  async create(@Body() dto: CreatePacienteDto): Promise<Paciente> {
    return this.pacienteService.create(dto);
  }

  @Get(':persId')
  @ApiOperation({ summary: 'Obtener un paciente por ID' })
  @ApiResponse({
    status: 200,
    description: 'Paciente encontrado',
    type: Paciente,
  })
  async findOne(@Param('persId') persId: number): Promise<Paciente> {
    return this.pacienteService.findOne(persId);
  }

  @Put(':persId')
  @ApiOperation({ summary: 'Actualizar información de paciente' })
  @ApiResponse({
    status: 200,
    description: 'Paciente actualizado',
    type: Paciente,
  })
  async update(
    @Param('persId') persId: number,
    @Body() dto: UpdatePacienteDto,
  ): Promise<Paciente> {
    return this.pacienteService.update(persId, dto);
  }

  @Delete(':persId')
  @ApiOperation({ summary: 'Eliminar un paciente' })
  @ApiResponse({
    status: 204,
    description: 'Paciente eliminado',
  })
  async delete(@Param('persId') persId: number): Promise<void> {
    return this.pacienteService.delete(persId);
  }
}
