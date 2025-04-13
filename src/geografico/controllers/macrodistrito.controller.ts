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

import { MacrodistritoService } from '../services/macrodistrito.service';
import { Macrodistrito } from '../entities/macrodistrito.entity';
import { CreateMacrodistritoDto } from '../dtos/create-macrodistrito.dto';
import { UpdateMacrodistritoDto } from '../dtos/update-macrodistrito.dto';

@Controller('macrodistrito')
export class MacrodistritoController {
  constructor(private readonly macrodistritoService: MacrodistritoService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los macrodistritos' })
  async findAll(): Promise<Macrodistrito[]> {
    return await this.macrodistritoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.macrodistritoService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Introduce un macrodistrito' })
  async create(@Body() data: CreateMacrodistritoDto): Promise<Macrodistrito> {
    return await this.macrodistritoService.create(data);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualiza la información de un macrodistrito',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del macrodistrito a actualizar',
    type: 'number',
  })
  async update(
    @Param('id') id: number,
    @Body() data: UpdateMacrodistritoDto,
  ): Promise<Macrodistrito> {
    return await this.macrodistritoService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un macrodistrito' })
  @ApiParam({
    name: 'id',
    description: 'ID del macrodistrito a eliminar',
    type: 'number',
  })
  async delete(@Param('id') id: number): Promise<void> {
    return await this.macrodistritoService.delete(id);
  }
}
