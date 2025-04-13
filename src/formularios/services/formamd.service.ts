import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FormAmd } from '../entities/formamd.entity';
import { CreateFormAmdDto } from '../dtos/create-formamd.dto';
import { UpdateFormAmdDto } from '../dtos/update-formamd.dto';

@Injectable()
export class FormAmdService {
  constructor(
    @InjectRepository(FormAmd)
    private readonly formAmdRepository: Repository<FormAmd>,
  ) {}

  async create(dto: CreateFormAmdDto): Promise<FormAmd> {
    const newFormAmd = this.formAmdRepository.create({
      formAmdEstado: dto.formAmdEstado || -1,
      formAmdMotivoConsulta: dto.formAmdMotivoConsulta,
      formAmdNumReferencia: dto.formAmdNumReferencia,
      formAmdDireccion: dto.formAmdDireccion,
      formAmdLatitud: dto.formAmdLatitud,
      formAmdLongitud: dto.formAmdLongitud,
      formAmdRefAdicional: dto.formAmdRefAdicional,
      formAmdImporte: dto.formAmdImporte,
      formAmdMetodoPago: dto.formAmdMetodoPago,
      formAmdInfoPagoId: dto.formAmdInfoPagoId,
    });
    return await this.formAmdRepository.save(newFormAmd);
  }

  async update(id: number, dto: UpdateFormAmdDto): Promise<FormAmd> {
    const formAmd = await this.formAmdRepository.findOne({
      where: { formAmdId: id },
    });
    if (!formAmd)
      throw new NotFoundException(`Formulario AMD #${id} no encontrado`);

    this.formAmdRepository.merge(formAmd, dto);
    return await this.formAmdRepository.save(formAmd);
  }

  async findAll(): Promise<FormAmd[]> {
    return await this.formAmdRepository.find();
  }

  async findOne(id: number): Promise<FormAmd> {
    const formAmd = await this.formAmdRepository.findOne({
      where: { formAmdId: id },
    });
    if (!formAmd)
      throw new NotFoundException(`Formulario AMD #${id} no encontrado`);
    return formAmd;
  }

  async delete(id: number): Promise<void> {
    const formAmd = await this.findOne(id);
    await this.formAmdRepository.remove(formAmd);
  }
}
