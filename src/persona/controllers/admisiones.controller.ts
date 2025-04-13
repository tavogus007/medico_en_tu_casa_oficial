import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AdmisionesService } from '../services/admisiones.service';

import { CreateAdmisionDto } from '../dtos/create-admision.dto';
import { UpdateAdmisionDto } from '../dtos/update-admision.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Admisiones } from '../entities/admisiones.entity';

@Controller('admisiones')
export class AdmisionesController {
  constructor(private readonly admisionesService: AdmisionesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos las entidades Admision' })
  @ApiResponse({
    status: 200,
    description: 'Lista de admisiones',
    type: [Admisiones],
  })
  async findAll(): Promise<Admisiones[]> {
    return this.admisionesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Registrar una Admision' })
  @ApiResponse({
    status: 201,
    description: 'Admision creado',
    type: Admisiones,
  })
  async create(@Body() dto: CreateAdmisionDto): Promise<Admisiones> {
    return this.admisionesService.create(dto);
  }

  @Get(':persId')
  @ApiOperation({ summary: 'Obtener admision por ID' })
  @ApiResponse({
    status: 200,
    description: 'Admision encontrado',
    type: Admisiones,
  })
  async findOne(@Param('persId') persId: number): Promise<Admisiones> {
    return this.admisionesService.findOne(persId);
  }

  @Put(':persId')
  @ApiOperation({ summary: 'Actualizar información de admision' })
  @ApiResponse({
    status: 200,
    description: 'Doctor actualizado',
    type: Admisiones,
  })
  async update(
    @Param('persId') persId: number,
    @Body() dto: UpdateAdmisionDto,
  ): Promise<Admisiones> {
    return this.admisionesService.update(persId, dto);
  }

  @Delete(':persId')
  @ApiOperation({ summary: 'Eliminar una admision' })
  @ApiResponse({
    status: 204,
    description: 'admision eliminado',
  })
  async delete(@Param('persId') persId: number): Promise<void> {
    return this.admisionesService.delete(persId);
  }
}
