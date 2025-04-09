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
import { VehiculoService } from '../services/vehiculo.service';
import { Vehiculo } from '../entities/vehiculo.entity';
import { CreateVehiculoDto } from '../dtos/create-vehiculo.dto';
import { UpdateVehiculoDto } from '../dtos/update-vehiculo.dto';

@ApiTags('Vehículos')
@Controller('vehiculos')
export class VehiculoController {
  constructor(private readonly vehiculoService: VehiculoService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los vehículos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de vehículos',
    type: [Vehiculo],
  })
  async findAll(): Promise<Vehiculo[]> {
    return this.vehiculoService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Registrar un nuevo vehículo' })
  @ApiResponse({
    status: 201,
    description: 'Vehículo creado',
    type: Vehiculo,
  })
  async create(@Body() dto: CreateVehiculoDto): Promise<Vehiculo> {
    return this.vehiculoService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un vehículo por ID' })
  @ApiResponse({
    status: 200,
    description: 'Vehículo encontrado',
    type: Vehiculo,
  })
  async findOne(@Param('id') id: number): Promise<Vehiculo> {
    return this.vehiculoService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un vehículo' })
  @ApiResponse({
    status: 200,
    description: 'Vehículo actualizado',
    type: Vehiculo,
  })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateVehiculoDto,
  ): Promise<Vehiculo> {
    return this.vehiculoService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un vehículo' })
  @ApiResponse({
    status: 204,
    description: 'Vehículo eliminado',
  })
  async delete(@Param('id') id: number): Promise<void> {
    return this.vehiculoService.delete(id);
  }
}
