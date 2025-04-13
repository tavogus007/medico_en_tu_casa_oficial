import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Agenda } from '../entities/agenda.entity';
import { UpdateAgendaDto } from '../dtos/update-agenda.dto';
import { Doctor } from '../entities/doctor.entity';
import { TrabajoSocial } from '../entities/trabajo-social.entity';
import { Admision } from '../entities/admision.entity';
import { Paciente } from '../entities/paciente.entity';
import { CreateAgendaDto } from '../dtos/create-agenda.dto';

@Injectable()
export class AgendaService {
  constructor(
    @InjectRepository(Agenda)
    private agendaRepo: Repository<Agenda>,
    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,
    @InjectRepository(TrabajoSocial)
    private trabajoSocialRepo: Repository<TrabajoSocial>,
    @InjectRepository(Admision)
    private admisionRepo: Repository<Admision>,
    @InjectRepository(Paciente)
    private pacienteRepo: Repository<Paciente>,
  ) {}

  async findAll(): Promise<Agenda[]> {
    return this.agendaRepo.find({
      relations: ['doctor', 'trabajoSocial', 'admision', 'paciente'],
    });
  }

  async findOne(id: number): Promise<Agenda> {
    const agenda = await this.agendaRepo.findOne({
      where: { agendaId: id },
      relations: ['doctor', 'trabajoSocial', 'admision', 'paciente'],
    });
    if (!agenda) throw new NotFoundException(`Agenda #${id} no encontrada`);
    return agenda;
  }

  async create(dto: CreateAgendaDto): Promise<Agenda> {
    const nuevaAgenda = this.agendaRepo.create({
      agendaEstado: dto.agendaEstado || 1,
    });

    if (dto.doctorId) {
      nuevaAgenda.doctor = await this.doctorRepo.findOneBy({
        doctorId: dto.doctorId,
      });
      if (!nuevaAgenda.doctor)
        throw new NotFoundException(`Doctor #${dto.doctorId} no encontrado`);
    }

    if (dto.trabajoSocialId) {
      nuevaAgenda.trabajoSocial = await this.trabajoSocialRepo.findOneBy({
        trabajoSocialId: dto.trabajoSocialId,
      });
      if (!nuevaAgenda.trabajoSocial)
        throw new NotFoundException(
          `Trabajo Social #${dto.trabajoSocialId} no encontrado`,
        );
    }

    if (dto.admisionId) {
      nuevaAgenda.admision = await this.admisionRepo.findOneBy({
        admisionId: dto.admisionId,
      });
      if (!nuevaAgenda.admision)
        throw new NotFoundException(
          `Admisión #${dto.admisionId} no encontrada`,
        );
    }

    if (dto.pacienteId) {
      nuevaAgenda.paciente = await this.pacienteRepo.findOneBy({
        pacienteId: dto.pacienteId,
      });
      if (!nuevaAgenda.paciente)
        throw new NotFoundException(
          `Paciente #${dto.pacienteId} no encontrado`,
        );
    }

    return this.agendaRepo.save(nuevaAgenda);
  }

  async update(id: number, dto: UpdateAgendaDto): Promise<Agenda> {
    const agenda = await this.findOne(id);

    if (dto.agendaEstado) {
      agenda.agendaEstado = dto.agendaEstado;
    }

    return this.agendaRepo.save(agenda);
  }

  async delete(id: number): Promise<void> {
    const agenda = await this.findOne(id);
    await this.agendaRepo.remove(agenda);
  }
}
