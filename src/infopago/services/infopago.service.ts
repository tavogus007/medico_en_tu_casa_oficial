import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { InformacionPago } from '../entities/infopago.entity';
import { CreateInformacionPagoDto } from '../dots/create-infopago.dto';
import { UpdateInformacionPagoDto } from '../dots/update-infopago.dto';

@Injectable()
export class InfopagoService {
  constructor(
    @InjectRepository(InformacionPago)
    private readonly infoPagoRepository: Repository<InformacionPago>,
  ) {}

  async findAll(): Promise<InformacionPago[]> {
    return await this.infoPagoRepository.find();
  }

  async findOne(id: number): Promise<InformacionPago> {
    const pago = await this.infoPagoRepository.findOne({
      where: { infoPagoId: id },
    });
    if (!pago) throw new NotFoundException(`Pago #${id} no encontrado`);
    return pago;
  }

  async create(dto: CreateInformacionPagoDto): Promise<InformacionPago> {
    const newPago = this.infoPagoRepository.create({
      infoPagoEstado: dto.infoPagoEstado || 1,
      infoPagoMonto: dto.infoPagoMonto,
      infoPagoDescripcion: dto.infoPagoDescripcion,
    });

    return await this.infoPagoRepository.save(newPago);
  }

  async update(
    id: number,
    dto: UpdateInformacionPagoDto,
  ): Promise<InformacionPago> {
    const pago = await this.infoPagoRepository.findOne({
      where: { infoPagoId: id },
    });
    if (!pago) throw new NotFoundException(`Pago #${id} no encontrado`);

    this.infoPagoRepository.merge(pago, dto);
    return await this.infoPagoRepository.save(pago);
  }

  async delete(id: number): Promise<void> {
    const pago = await this.findOne(id);
    await this.infoPagoRepository.remove(pago);
  }
}
