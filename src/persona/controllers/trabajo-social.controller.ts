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

import { TrabajoSocialService } from '../services/trabsocial.service';
import { TrabajoSocial } from '../entities/trabajoSoclal.entity';
import { CreateTrabajoSocialDto } from '../dtos/create-trabsoc.dto';
import { UpdateTrabajoSocialDto } from '../dtos/update-trabsoc.dto';

@ApiTags('Trabajo Social')
@Controller('trabajo-social')
export class TrabajoSocialController {
  constructor(private readonly trabajoSocialService: TrabajoSocialService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los trabajos sociales' })
  @ApiResponse({
    status: 200,
    description: 'Lista de trabajos sociales',
    type: [TrabajoSocial],
  })
  async findAll(): Promise<TrabajoSocial[]> {
    return this.trabajoSocialService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un trabajo social por ID' })
  @ApiResponse({
    status: 200,
    description: 'Trabajo social encontrado',
    type: TrabajoSocial,
  })
  async findOne(@Param('id') id: number): Promise<TrabajoSocial> {
    return this.trabajoSocialService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo trabajo social' })
  @ApiResponse({
    status: 201,
    description: 'Trabajo social creado',
    type: TrabajoSocial,
  })
  async create(@Body() dto: CreateTrabajoSocialDto): Promise<TrabajoSocial> {
    return this.trabajoSocialService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un trabajo social' })
  @ApiResponse({
    status: 200,
    description: 'Trabajo social actualizado',
    type: TrabajoSocial,
  })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateTrabajoSocialDto,
  ): Promise<TrabajoSocial> {
    return this.trabajoSocialService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un trabajo social' })
  @ApiResponse({
    status: 204,
    description: 'Trabajo social eliminado',
  })
  async delete(@Param('id') id: number): Promise<void> {
    return this.trabajoSocialService.delete(id);
  }
}
