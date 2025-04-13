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

import { RutaService } from '../services/ruta.service';
import { Ruta } from '../entities/ruta.entity';
import { CreateRutaDto } from '../dtos/create-ruta.dto';
import { UpdateRutaDto } from '../dtos/update-ruta.dto';

@ApiTags('Ruta')
@Controller('ruta')
export class RutaController {
  constructor(private readonly rutaService: RutaService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las rutas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de rutas',
    type: [Ruta],
  })
  async findAll(): Promise<Ruta[]> {
    return this.rutaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una ruta por ID' })
  @ApiResponse({
    status: 200,
    description: 'Ruta encontrada',
    type: Ruta,
  })
  async findOne(@Param('id') id: number): Promise<Ruta> {
    return this.rutaService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva ruta' })
  @ApiResponse({
    status: 201,
    description: 'Ruta creada',
    type: Ruta,
  })
  async create(@Body() dto: CreateRutaDto): Promise<Ruta> {
    return this.rutaService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una ruta' })
  @ApiResponse({
    status: 200,
    description: 'Ruta actualizada',
    type: Ruta,
  })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateRutaDto,
  ): Promise<Ruta> {
    return this.rutaService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una ruta' })
  @ApiResponse({
    status: 204,
    description: 'Ruta eliminada',
  })
  async delete(@Param('id') id: number): Promise<void> {
    return this.rutaService.delete(id);
  }
}
