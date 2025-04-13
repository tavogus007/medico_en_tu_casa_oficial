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

import { SmartwatchService } from '../services/smartwatch.service';
import { Smartwatch } from '../entities/smartwatch.entity';
import { CreateSmartwatchDto } from '../dtos/create-smartwatch.dto';
import { UpdateSmartwatchDto } from '../dtos/update-smartwatch.dto';

@ApiTags('Smartwatch')
@Controller('smartwatch')
export class SmartwatchController {
  constructor(private readonly smartwatchService: SmartwatchService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los registros' })
  @ApiResponse({
    status: 200,
    description: 'Lista de registros',
    type: [Smartwatch],
  })
  async findAll(): Promise<Smartwatch[]> {
    return this.smartwatchService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Registrar datos de smartwatch' })
  @ApiResponse({
    status: 201,
    description: 'Datos registrados',
    type: Smartwatch,
  })
  async create(@Body() dto: CreateSmartwatchDto): Promise<Smartwatch> {
    return this.smartwatchService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un registro por ID' })
  @ApiResponse({
    status: 200,
    description: 'Registro encontrado',
    type: Smartwatch,
  })
  async findOne(@Param('id') id: number): Promise<Smartwatch> {
    return this.smartwatchService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar datos de smartwatch' })
  @ApiResponse({
    status: 200,
    description: 'Datos actualizados',
    type: Smartwatch,
  })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateSmartwatchDto,
  ): Promise<Smartwatch> {
    return this.smartwatchService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un registro' })
  @ApiResponse({
    status: 204,
    description: 'Registro eliminado',
  })
  async delete(@Param('id') id: number): Promise<void> {
    return this.smartwatchService.delete(id);
  }
}
