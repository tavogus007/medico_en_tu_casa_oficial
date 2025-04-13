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

import { DistritoService } from '../services/distrito.service';
import { Distrito } from '../entities/distrito.entity';
import { CreateDistritoDto } from '../dtos/create-distrito.dto';
import { UpdateDistritoDto } from '../dtos/update-distrito.dto';

@Controller('distrito')
export class DistritoController {
  constructor(private readonly distritoService: DistritoService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los distritos' })
  async findAll(): Promise<Distrito[]> {
    return await this.distritoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.distritoService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Introduce un Distrito' })
  async create(@Body() data: CreateDistritoDto): Promise<Distrito> {
    return await this.distritoService.create(data);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualiza la información de un Distrito',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del Distrito a actualizar',
    type: 'number',
  })
  async update(
    @Param('id') id: number,
    @Body() data: UpdateDistritoDto,
  ): Promise<Distrito> {
    return await this.distritoService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un Distrito' })
  @ApiParam({
    name: 'id',
    description: 'ID del Distrito a eliminar',
    type: 'number',
  })
  async delete(@Param('id') id: number): Promise<void> {
    return await this.distritoService.delete(id);
  }
}
