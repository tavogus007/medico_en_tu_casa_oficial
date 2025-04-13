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

import { InfopagoService } from '../services/infopago.service';
import { InformacionPago } from '../entities/infopago.entity';
import { CreateInformacionPagoDto } from '../dots/create-infopago.dto';
import { UpdateInformacionPagoDto } from '../dots/update-infopago.dto';

@ApiTags('Información de Pagos')
@Controller('informacion-pago')
export class InfoPagoController {
  constructor(private readonly infoPagoService: InfopagoService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los pagos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de pagos',
    type: [InformacionPago],
  })
  async findAll(): Promise<InformacionPago[]> {
    return this.infoPagoService.findAll();
  }
  @Post()
  @ApiOperation({ summary: 'Registrar nueva información de pago' })
  @ApiResponse({
    status: 201,
    description: 'Pago registrado',
    type: InformacionPago,
  })
  async create(
    @Body() dto: CreateInformacionPagoDto,
  ): Promise<InformacionPago> {
    return this.infoPagoService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un pago por ID' })
  @ApiResponse({
    status: 200,
    description: 'Pago encontrado',
    type: InformacionPago,
  })
  async findOne(@Param('id') id: number): Promise<InformacionPago> {
    return this.infoPagoService.findOne(id);
  }
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar información de pago' })
  @ApiResponse({
    status: 200,
    description: 'Pago actualizado',
    type: InformacionPago,
  })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateInformacionPagoDto,
  ): Promise<InformacionPago> {
    return this.infoPagoService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un pago' })
  @ApiResponse({
    status: 204,
    description: 'Pago eliminado',
  })
  async delete(@Param('id') id: number): Promise<void> {
    return this.infoPagoService.delete(id);
  }
}
