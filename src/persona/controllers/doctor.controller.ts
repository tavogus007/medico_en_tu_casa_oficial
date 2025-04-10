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

@ApiTags('Doctores')
@Controller('doctores')
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

  @Post()
  @ApiOperation({ summary: 'Registrar un nuevo doctor' })
  @ApiResponse({
    status: 201,
    description: 'Doctor creado',
    type: Doctor,
  })
  async create(@Body() dto: CreateDoctorDto): Promise<Doctor> {
    return this.doctorService.create(dto);
  }

  @Get(':persId')
  @ApiOperation({ summary: 'Obtener un doctor por ID' })
  @ApiResponse({
    status: 200,
    description: 'Doctor encontrado',
    type: Doctor,
  })
  async findOne(@Param('persId') persId: number): Promise<Doctor> {
    return this.doctorService.findOne(persId);
  }

  @Put(':persId')
  @ApiOperation({ summary: 'Actualizar información de doctor' })
  @ApiResponse({
    status: 200,
    description: 'Doctor actualizado',
    type: Doctor,
  })
  async update(
    @Param('persId') persId: number,
    @Body() dto: UpdateDoctorDto,
  ): Promise<Doctor> {
    return this.doctorService.update(persId, dto);
  }

  @Delete(':persId')
  @ApiOperation({ summary: 'Eliminar un doctor' })
  @ApiResponse({
    status: 204,
    description: 'Doctor eliminado',
  })
  async delete(@Param('persId') persId: number): Promise<void> {
    return this.doctorService.delete(persId);
  }
}
