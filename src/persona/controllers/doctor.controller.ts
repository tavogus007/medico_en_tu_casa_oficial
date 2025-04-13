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

import { DoctorService } from '../services/doctor.service';
import { Doctor } from '../entities/doctor.entity';
import { CreateDoctorDto } from '../dtos/create-doctor.dto';
import { UpdateDoctorDto } from '../dtos/update-doctor.dto';

@ApiTags('Doctor')
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los doctores' })
  @ApiResponse({
    status: 200,
    description: 'Lista de doctores',
    type: [Doctor],
  })
  async findAll(): Promise<Doctor[]> {
    return this.doctorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un doctor por ID' })
  @ApiResponse({
    status: 200,
    description: 'Doctor encontrado',
    type: Doctor,
  })
  async findOne(@Param('id') id: number): Promise<Doctor> {
    return this.doctorService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo doctor' })
  @ApiResponse({
    status: 201,
    description: 'Doctor creado',
    type: Doctor,
  })
  async create(@Body() dto: CreateDoctorDto): Promise<Doctor> {
    return this.doctorService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un doctor' })
  @ApiResponse({
    status: 200,
    description: 'Doctor actualizado',
    type: Doctor,
  })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateDoctorDto,
  ): Promise<Doctor> {
    return this.doctorService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un doctor' })
  @ApiResponse({
    status: 204,
    description: 'Doctor eliminado',
  })
  async delete(@Param('id') id: number): Promise<void> {
    return this.doctorService.delete(id);
  }
}
