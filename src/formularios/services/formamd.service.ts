import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FormAmd } from '../entities/formamd.entity';
import { CreateFormAmdDto } from '../dtos/create-formamd.dto';
import { UpdateFormAmdDto } from '../dtos/update-formamd.dto';
import { InformacionPago } from '../../infopago/entities/infopago.entity';

@Injectable()
export class FormAmdService {
  constructor(
    @InjectRepository(FormAmd)
    private formAmdRepo: Repository<FormAmd>,
    @InjectRepository(InformacionPago)
    private infoPagoRepo: Repository<InformacionPago>,
  ) {}

  async findAll(): Promise<FormAmd[]> {
    return this.formAmdRepo.find({ relations: ['infoPago'] });
  }

  async findOne(id: number): Promise<FormAmd> {
    const form = await this.formAmdRepo.findOne({
      where: { formAmdId: id },
      relations: ['infoPago'],
    });
    if (!form) {
      throw new NotFoundException(`Formulario AMD #${id} no encontrado`);
    }
    return form;
  }

  async create(dto: CreateFormAmdDto): Promise<FormAmd> {
    let infoPago: InformacionPago = null;

    if (dto.formAmdInfoPagoId !== undefined && dto.formAmdInfoPagoId !== null) {
      infoPago = await this.infoPagoRepo.findOne({
        where: { infoPagoId: dto.formAmdInfoPagoId },
      });

      if (!infoPago) {
        throw new NotFoundException(
          `Información de pago #${dto.formAmdInfoPagoId} no encontrada`,
        );
      }
    }

    const newForm = this.formAmdRepo.create({
      formAmdEstado: dto.formAmdEstado || 1,
      formAmdMotivoConsulta: dto.formAmdMotivoConsulta,
      formAmdNumReferencia: dto.formAmdNumReferencia,
      formAmdDireccion: dto.formAmdDireccion,
      formAmdLatitud: dto.formAmdLatitud,
      formAmdLongitud: dto.formAmdLongitud,
      formAmdRefAdicional: dto.formAmdRefAdicional,
      formAmdImporte: dto.formAmdImporte,
      formAmdMetodoPago: dto.formAmdMetodoPago,
      infoPago, // puede ser null
      formAmdTipoCiudadano: dto.formAmdTipoCiudadano,
      formAmdIdCiudadano: dto.formAmdIdCiudadano,
      formAmdEmail: dto.formAmdEmail,
    });

    return this.formAmdRepo.save(newForm);
  }

  async update(id: number, dto: UpdateFormAmdDto): Promise<FormAmd> {
    const form = await this.findOne(id);

    if (dto.formAmdEstado !== undefined) form.formAmdEstado = dto.formAmdEstado;
    if (dto.formAmdMotivoConsulta)
      form.formAmdMotivoConsulta = dto.formAmdMotivoConsulta;
    if (dto.formAmdNumReferencia)
      form.formAmdNumReferencia = dto.formAmdNumReferencia;
    if (dto.formAmdDireccion) form.formAmdDireccion = dto.formAmdDireccion;
    if (dto.formAmdLatitud) form.formAmdLatitud = dto.formAmdLatitud;
    if (dto.formAmdLongitud) form.formAmdLongitud = dto.formAmdLongitud;
    if (dto.formAmdRefAdicional)
      form.formAmdRefAdicional = dto.formAmdRefAdicional;
    if (dto.formAmdImporte) form.formAmdImporte = dto.formAmdImporte;
    if (dto.formAmdMetodoPago) form.formAmdMetodoPago = dto.formAmdMetodoPago;

    if (dto.formAmdInfoPagoId) {
      const infoPago = await this.infoPagoRepo.findOne({
        where: { infoPagoId: dto.formAmdInfoPagoId },
      });
      if (!infoPago) {
        throw new NotFoundException(
          `Información de pago #${dto.formAmdInfoPagoId} no encontrada`,
        );
      }
      form.infoPago = infoPago;
    }

    return this.formAmdRepo.save(form);
  }
  async delete(id: number): Promise<void> {
    const form = await this.findOne(id);
    await this.formAmdRepo.remove(form);
  }
}
