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

import { AgendaService } from '../services/agenda.service';
import { Agenda } from '../entities/agenda.entity';
import { CreateAgendaDto } from '../dtos/create-agenda.dto';
import { UpdateAgendaDto } from '../dtos/update-agenda.dto';

@ApiTags('Agenda')
@Controller('agenda')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las agendas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de agendas',
    type: [Agenda],
  })
  async findAll(): Promise<Agenda[]> {
    return this.agendaService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva agenda' })
  @ApiResponse({
    status: 201,
    description: 'Agenda creada',
    type: Agenda,
  })
  async create(@Body() dto: CreateAgendaDto): Promise<Agenda> {
    return this.agendaService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una agenda por ID' })
  @ApiResponse({
    status: 200,
    description: 'Agenda encontrada',
    type: Agenda,
  })
  async findOne(@Param('id') id: number): Promise<Agenda> {
    return this.agendaService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una agenda' })
  @ApiResponse({
    status: 200,
    description: 'Agenda actualizada',
    type: Agenda,
  })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateAgendaDto,
  ): Promise<Agenda> {
    return this.agendaService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una agenda' })
  @ApiResponse({
    status: 204,
    description: 'Agenda eliminada',
  })
  async delete(@Param('id') id: number): Promise<void> {
    return this.agendaService.delete(id);
  }
}
