import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

import { PersonaService } from '../services/persona.service';
import { Persona } from '../entities/persona.entity';
import { CreatePersonaDto } from '../dtos/create-persona.dto';
import { UpdatePersonaDto } from '../dtos/update-persona.dto';

@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las personas' })
  async findAll(): Promise<Persona[]> {
    return await this.personaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.personaService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Introduce una persona' })
  async create(@Body() data: CreatePersonaDto): Promise<Persona> {
    return await this.personaService.create(data);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualiza la información de una persona',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del paciente a actualizar',
    type: 'number',
  })
  async update(
    @Param('id') id: number,
    @Body() data: UpdatePersonaDto,
  ): Promise<Persona> {
    return await this.personaService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina una persona' })
  @ApiParam({
    name: 'id',
    description: 'ID del paciente a eliminar',
    type: 'number',
  })
  async delete(@Param('id') id: number): Promise<void> {
    return await this.personaService.delete(id);
  }
}
