import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Paciente } from '../entities/paciente.entity';
import { Persona } from '../entities/persona.entity';
import { Smartwatch } from '../../smartwatch/entities/smartwatch.entity';
import { FormAmd } from '../../formularios/entities/formamd.entity';
import { Agenda } from '../../agenda/entities/agenda.entity';
import { CreatePacienteDto } from '../dtos/create-paciente.dto';
import { UpdatePacienteDto } from '../dtos/update-paciente.dto';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private pacienteRepo: Repository<Paciente>,
    @InjectRepository(Persona)
    private personaRepo: Repository<Persona>,
    @InjectRepository(Smartwatch)
    private smartwatchRepo: Repository<Smartwatch>,
    @InjectRepository(FormAmd)
    private formAmdRepo: Repository<FormAmd>,
    @InjectRepository(Agenda)
    private agendaRepo: Repository<Agenda>,
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
  ) {}

  async findAll(): Promise<Paciente[]> {
    return this.pacienteRepo.find({
      relations: ['persona', 'smartwatch', 'formAmd', 'agenda'],
    });
  }

  async findOne(id: number): Promise<Paciente> {
    const paciente = await this.pacienteRepo.findOne({
      where: { personaId: id },
      relations: ['persona', 'smartwatch', 'formAmd', 'agenda'],
    });
    if (!paciente) throw new NotFoundException(`Paciente #${id} no encontrado`);
    return paciente;
  }

  async create(dto: CreatePacienteDto): Promise<Paciente> {
    const persona = await this.personaRepo.findOneBy({
      persId: dto.personaId,
    });
    if (!persona)
      throw new NotFoundException(`Persona #${dto.personaId} no encontrada`);

    const newPaciente = this.pacienteRepo.create({
      personaId: dto.personaId,
      pacienteUsuario: dto.pacienteUsuario,
      pacienteFechaNac: dto.pacienteFechaNac,
      pacienteDireccion: dto.pacienteDireccion,
      pacienteCelular: dto.pacienteCelular,
      pacienteCodigoSiis: dto.pacienteCodigoSiis,
      pacienteCodigoSice: dto.pacienteCodigoSice,
      pacienteEstado: 1,
    });

    if (dto.smartwatchId) {
      newPaciente.smartwatch = await this.smartwatchRepo.findOneBy({
        smartId: dto.smartwatchId,
      });
      if (!newPaciente.smartwatch)
        throw new NotFoundException(
          `Smartwatch #${dto.smartwatchId} no encontrado`,
        );
    }

    if (dto.formAmdId) {
      newPaciente.formAmd = await this.formAmdRepo.findOneBy({
        formAmdId: dto.formAmdId,
      });
      if (!newPaciente.formAmd)
        throw new NotFoundException(
          `Formulario AMD #${dto.formAmdId} no encontrado`,
        );
    }

    if (dto.agendaId) {
      newPaciente.agenda = await this.agendaRepo.findOneBy({
        agendaId: dto.agendaId,
      });
      if (!newPaciente.agenda)
        throw new NotFoundException(`Agenda #${dto.agendaId} no encontrada`);
    }

    return this.pacienteRepo.save(newPaciente);
  }

  async update(id: number, dto: UpdatePacienteDto): Promise<Paciente> {
    const paciente = await this.findOne(id);

    if (dto.pacienteUsuario) paciente.pacienteUsuario = dto.pacienteUsuario;
    if (dto.pacienteFechaNac) paciente.pacienteFechaNac = dto.pacienteFechaNac;
    if (dto.pacienteDireccion)
      paciente.pacienteDireccion = dto.pacienteDireccion;
    if (dto.pacienteCelular) paciente.pacienteCelular = dto.pacienteCelular;
    if (dto.pacienteCodigoSiis)
      paciente.pacienteCodigoSiis = dto.pacienteCodigoSiis;
    if (dto.pacienteCodigoSice)
      paciente.pacienteCodigoSice = dto.pacienteCodigoSice;

    if (dto.smartwatchId) {
      paciente.smartwatch = await this.smartwatchRepo.findOneBy({
        smartId: dto.smartwatchId,
      });
      if (!paciente.smartwatch)
        throw new NotFoundException(
          `Smartwatch #${dto.smartwatchId} no encontrado`,
        );
    }

    if (dto.formAmdId) {
      paciente.formAmd = await this.formAmdRepo.findOneBy({
        formAmdId: dto.formAmdId,
      });
      if (!paciente.formAmd)
        throw new NotFoundException(
          `Formulario AMD #${dto.formAmdId} no encontrado`,
        );
    }

    if (dto.agendaId) {
      paciente.agenda = await this.agendaRepo.findOneBy({
        agendaId: dto.agendaId,
      });
      if (!paciente.agenda)
        throw new NotFoundException(`Agenda #${dto.agendaId} no encontrada`);
    }

    return this.pacienteRepo.save(paciente);
  }

  async delete(id: number): Promise<void> {
    const paciente = await this.findOne(id);
    await this.pacienteRepo.remove(paciente);
  }

  async findByFormAmdId(formAmdId: number): Promise<Paciente> {
    const paciente = await this.pacienteRepository.findOne({
      where: { formAmd: { formAmdId: formAmdId } },
      relations: ['formAmd'], // Incluir la relación
    });

    if (!paciente) {
      throw new NotFoundException(
        `Paciente con formAmdId ${formAmdId} no encontrado`,
      );
    }

    return paciente;
  }

  async updatePartial(
    personaId: number,
    updateDto: Partial<UpdatePacienteDto>,
  ): Promise<Paciente> {
    const paciente = await this.pacienteRepository.findOne({
      where: { personaId },
    });

    if (!paciente) {
      throw new NotFoundException(
        `Paciente con personaId ${personaId} no encontrado`,
      );
    }

    // Actualizar solo los campos proporcionados
    Object.assign(paciente, updateDto);
    return this.pacienteRepository.save(paciente);
  }
}
