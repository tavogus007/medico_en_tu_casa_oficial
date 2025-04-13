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

import { HospitalMunicipalService } from '../services/hospital-munic.service';
import { HospitalMunicipal } from '../entities/hospmun.entity';
import { CreateHospitalMunicipalDto } from '../dtos/create-hospmun.dto';
import { UpdateHospitalMunicipalDto } from '../dtos/update-hospmun.dto';

@ApiTags('Hospital Municipal')
@Controller('hospital-municipal')
export class HospitalMunicipalController {
  constructor(private readonly hospitalService: HospitalMunicipalService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los hospitales municipales' })
  @ApiResponse({
    status: 200,
    description: 'Lista de hospitales municipales',
    type: [HospitalMunicipal],
  })
  async findAll(): Promise<HospitalMunicipal[]> {
    return this.hospitalService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo hospital municipal' })
  @ApiResponse({
    status: 201,
    description: 'Hospital municipal creado',
    type: HospitalMunicipal,
  })
  async create(
    @Body() dto: CreateHospitalMunicipalDto,
  ): Promise<HospitalMunicipal> {
    return this.hospitalService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un hospital municipal por ID' })
  @ApiResponse({
    status: 200,
    description: 'Hospital municipal encontrado',
    type: HospitalMunicipal,
  })
  async findOne(@Param('id') id: number): Promise<HospitalMunicipal> {
    return this.hospitalService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un hospital municipal' })
  @ApiResponse({
    status: 200,
    description: 'Hospital municipal actualizado',
    type: HospitalMunicipal,
  })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateHospitalMunicipalDto,
  ): Promise<HospitalMunicipal> {
    return this.hospitalService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un hospital municipal' })
  @ApiResponse({
    status: 204,
    description: 'Hospital municipal eliminado',
  })
  async delete(@Param('id') id: number): Promise<void> {
    return this.hospitalService.delete(id);
  }
}
