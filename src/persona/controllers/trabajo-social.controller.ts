import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { TrabsocialService } from '../services/trabsocial.service';
import { CreateTrabajoSocialDto } from '../dtos/create-trabsoc.dto';
import { UpdateTrabajoSocialDto } from '../dtos/update-trabsoc.dto';
import { TrabajoSocial } from '../entities/trabajoSoclal.entity';

@Controller('trabajosocial')
export class TrabajoSocialController {
  constructor(private readonly trabsocService: TrabsocialService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos las entidades trabsoc' })
  @ApiResponse({
    status: 200,
    description: 'Lista de trabsoc',
    type: [TrabajoSocial],
  })
  async findAll(): Promise<TrabajoSocial[]> {
    return this.trabsocService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Registrar una trabsoc' })
  @ApiResponse({
    status: 201,
    description: 'trabsoc creado',
    type: TrabajoSocial,
  })
  async create(@Body() dto: CreateTrabajoSocialDto): Promise<TrabajoSocial> {
    return this.trabsocService.create(dto);
  }

  @Get(':persId')
  @ApiOperation({ summary: 'Obtener trabsoc por ID' })
  @ApiResponse({
    status: 200,
    description: 'trabsoc encontrado',
    type: TrabajoSocial,
  })
  async findOne(@Param('persId') persId: number): Promise<TrabajoSocial> {
    return this.trabsocService.findOne(persId);
  }

  @Put(':persId')
  @ApiOperation({ summary: 'Actualizar información de trabsoc' })
  @ApiResponse({
    status: 200,
    description: 'Doctor actualizado',
    type: TrabajoSocial,
  })
  async update(
    @Param('persId') persId: number,
    @Body() dto: UpdateTrabajoSocialDto,
  ): Promise<TrabajoSocial> {
    return this.trabsocService.update(persId, dto);
  }

  @Delete(':persId')
  @ApiOperation({ summary: 'Eliminar una trabsoc' })
  @ApiResponse({
    status: 204,
    description: 'trabsoc eliminado',
  })
  async delete(@Param('persId') persId: number): Promise<void> {
    return this.trabsocService.delete(persId);
  }
}
