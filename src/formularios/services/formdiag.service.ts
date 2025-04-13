import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FormDiagnostico } from '../entities/formdiag.entity';
import { Persona } from '../../persona/entities/persona.entity';
import { CreateFormDiagnosticoDto } from '../dtos/create-formdiag.dto';
import { UpdateFormDiagnosticoDto } from '../dtos/update-formdiag.dto';

@Injectable()
export class FormDiagnosticoService {
  constructor(
    @InjectRepository(FormDiagnostico)
    private formDiagnosticoRepo: Repository<FormDiagnostico>,
    @InjectRepository(Persona)
    private personaRepo: Repository<Persona>,
  ) {}

  async findAll(): Promise<FormDiagnostico[]> {
    return this.formDiagnosticoRepo.find({ relations: ['persona'] });
  }

  async findOne(id: number): Promise<FormDiagnostico> {
    const form = await this.formDiagnosticoRepo.findOne({
      where: { formDiagnosticoId: id },
      relations: ['persona'],
    });
    if (!form)
      throw new NotFoundException(
        `Formulario diagnóstico #${id} no encontrado`,
      );
    return form;
  }

  async create(dto: CreateFormDiagnosticoDto): Promise<FormDiagnostico> {
    const persona = await this.personaRepo.findOneBy({
      persId: dto.personaId,
    });
    if (!persona)
      throw new NotFoundException(`Persona #${dto.personaId} no encontrada`);

    const newForm = this.formDiagnosticoRepo.create({
      formDiagnosticoFrecCardiaca: dto.frecCardiaca,
      formDiagnosticoPresArterial: dto.presArterial,
      formDiagnosticoFrecRespiratoria: dto.frecRespiratoria,
      formDiagnosticoTemperatura: dto.temperatura,
      formDiagnosticoSaturacionOxigeno: dto.saturacionOxigeno,
      formDiagnosticoDiagnosticoPresuntivo: dto.diagnosticoPresuntivo,
      formDiagnosticoNombreMedicamento: dto.nombreMedicamento,
      formDiagnosticoPresentacionMedicamento: dto.presentacionMedicamento,
      formDiagnosticoCantidadMedicamento: dto.cantidadMedicamento,
      formDiagnosticoPosologia: dto.posologia,
      formDiagnosticoNotasAdicionales: dto.notasAdicionales,
      formDiagnosticoEstado: 1,
      formDiagnosticoPersonaId: dto.personaId,
    });

    return this.formDiagnosticoRepo.save(newForm);
  }

  async update(
    id: number,
    dto: UpdateFormDiagnosticoDto,
  ): Promise<FormDiagnostico> {
    const form = await this.findOne(id);

    if (dto.frecCardiaca) form.formDiagnosticoFrecCardiaca = dto.frecCardiaca;
    if (dto.presArterial) form.formDiagnosticoPresArterial = dto.presArterial;
    if (dto.frecRespiratoria)
      form.formDiagnosticoFrecRespiratoria = dto.frecRespiratoria;
    if (dto.temperatura) form.formDiagnosticoTemperatura = dto.temperatura;
    if (dto.saturacionOxigeno)
      form.formDiagnosticoSaturacionOxigeno = dto.saturacionOxigeno;
    if (dto.diagnosticoPresuntivo)
      form.formDiagnosticoDiagnosticoPresuntivo = dto.diagnosticoPresuntivo;
    if (dto.nombreMedicamento)
      form.formDiagnosticoNombreMedicamento = dto.nombreMedicamento;
    if (dto.presentacionMedicamento)
      form.formDiagnosticoPresentacionMedicamento = dto.presentacionMedicamento;
    if (dto.cantidadMedicamento)
      form.formDiagnosticoCantidadMedicamento = dto.cantidadMedicamento;
    if (dto.posologia) form.formDiagnosticoPosologia = dto.posologia;
    if (dto.notasAdicionales)
      form.formDiagnosticoNotasAdicionales = dto.notasAdicionales;

    if (dto.personaId) {
      const persona = await this.personaRepo.findOneBy({
        persId: dto.personaId,
      });
      if (!persona)
        throw new NotFoundException(`Persona #${dto.personaId} no encontrada`);
      form.formDiagnosticoPersonaId = dto.personaId;
    }

    return this.formDiagnosticoRepo.save(form);
  }

  async delete(id: number): Promise<void> {
    const form = await this.findOne(id);
    await this.formDiagnosticoRepo.remove(form);
  }
}
