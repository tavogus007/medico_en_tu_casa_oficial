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

import { ZonaService } from '../services/zona.service';
import { Zona } from '../entities/zona.entity';
import { CreateZonaDto } from '../dtos/create-zona.dto';
import { UpdateZonaDto } from '../dtos/update-zona.dto';

@Controller('zona')
export class ZonaController {
  constructor(private readonly zonaService: ZonaService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los zona' })
  async findAll(): Promise<Zona[]> {
    return await this.zonaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.zonaService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Introduce un zona' })
  async create(@Body() data: CreateZonaDto): Promise<Zona> {
    return await this.zonaService.create(data);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualiza la información de un zona',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del zona a actualizar',
    type: 'number',
  })
  async update(
    @Param('id') id: number,
    @Body() data: UpdateZonaDto,
  ): Promise<Zona> {
    return await this.zonaService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un zona' })
  @ApiParam({
    name: 'id',
    description: 'ID del zona a eliminar',
    type: 'number',
  })
  async delete(@Param('id') id: number): Promise<void> {
    return await this.zonaService.delete(id);
  }
}
