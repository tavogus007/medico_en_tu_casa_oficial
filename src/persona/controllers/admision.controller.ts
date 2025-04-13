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

import { AdmisionService } from '../services/admision.service';
import { Admision } from '../entities/admision.entity';
import { CreateAdmisionDto } from '../dtos/create-admision.dto';
import { UpdateAdmisionDto } from '../dtos/update-admision.dto';

@ApiTags('Admisión')
@Controller('admision')
export class AdmisionController {
  constructor(private readonly admisionService: AdmisionService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las admisiones' })
  @ApiResponse({
    status: 200,
    description: 'Lista de admisiones',
    type: [Admision],
  })
  async findAll(): Promise<Admision[]> {
    return this.admisionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una admisión por ID' })
  @ApiResponse({
    status: 200,
    description: 'Admisión encontrada',
    type: Admision,
  })
  async findOne(@Param('id') id: number): Promise<Admision> {
    return this.admisionService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva admisión' })
  @ApiResponse({
    status: 201,
    description: 'Admisión creada',
    type: Admision,
  })
  async create(@Body() dto: CreateAdmisionDto): Promise<Admision> {
    return this.admisionService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una admisión' })
  @ApiResponse({
    status: 200,
    description: 'Admisión actualizada',
    type: Admision,
  })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateAdmisionDto,
  ): Promise<Admision> {
    return this.admisionService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una admisión' })
  @ApiResponse({
    status: 204,
    description: 'Admisión eliminada',
  })
  async delete(@Param('id') id: number): Promise<void> {
    return this.admisionService.delete(id);
  }
}
