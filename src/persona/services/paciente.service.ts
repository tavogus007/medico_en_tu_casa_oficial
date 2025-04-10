import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Paciente } from '../entities/paciente.entity';
import { Persona } from '../entities/persona.entity';
import { Igob } from '../../sistema/entities/igob.entity';
import { Smartwatch } from '../../smartwatch/entities/smartwatch.entity';
import { InfoDomicilio } from '../../ruta/entities/infodom.entity';
import { CreatePacienteDto } from '../dtos/create-paciente.dto';
import { UpdatePacienteDto } from '../dtos/update-paciente.dto';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
    @InjectRepository(Igob)
    private readonly igobRepository: Repository<Igob>,
    @InjectRepository(Smartwatch)
    private readonly smartwatchRepository: Repository<Smartwatch>,
    @InjectRepository(InfoDomicilio)
    private readonly infoDomicilioRepository: Repository<InfoDomicilio>,
  ) {}

  async findAll(): Promise<Paciente[]> {
    return await this.pacienteRepository.find({
      relations: ['persona', 'igob', 'smartwatch', 'infoDomicilio'],
    });
  }

  async findOne(persId: number): Promise<Paciente> {
    const paciente = await this.pacienteRepository.findOne({
      where: { persId },
      relations: ['persona', 'igob', 'smartwatch', 'infoDomicilio'],
    });
    if (!paciente)
      throw new NotFoundException(`Paciente #${persId} no encontrado`);
    return paciente;
  }

  async create(dto: CreatePacienteDto): Promise<Paciente> {
    // 1. Verificar que la Persona existe
    const persona = await this.personaRepository.findOne({
      where: { persId: dto.persId },
    });
    if (!persona) {
      throw new NotFoundException(`Persona #${dto.persId} no encontrada`);
    }

    // 2. Buscar las entidades relacionadas (si se proporcionan IDs)
    const igob = dto.igobId
      ? await this.igobRepository.findOne({ where: { igobId: dto.igobId } })
      : null;
    const smartwatch = dto.smartId
      ? await this.smartwatchRepository.findOne({
          where: { smartId: dto.smartId },
        })
      : null;
    const infoDomicilio = dto.infoDomId
      ? await this.infoDomicilioRepository.findOne({
          where: { infoDomId: dto.infoDomId },
        })
      : null;

    // 3. Crear y guardar el Paciente (mapeando todos los campos)
    const paciente = this.pacienteRepository.create({
      persId: dto.persId,
      pacEstado: dto.pacEstado || 'A', // Valor por defecto
      pacFechaNac: dto.pacFechaNac,
      pacDireccion: dto.pacDireccion,
      pacCelular: dto.pacCelular,
      pacAtencionDomicilio: dto.pacAtencionDomicilio || false,
      igob, // Relación con Igob
      smartwatch, // Relación con Smartwatch
      infoDomicilio, // Relación con InfoDomicilio
    });

    return await this.pacienteRepository.save(paciente);
  }

  async update(persId: number, dto: UpdatePacienteDto): Promise<Paciente> {
    const paciente = await this.pacienteRepository.findOne({
      where: { persId },
    });
    if (!paciente)
      throw new NotFoundException(`Paciente #${persId} no encontrado`);

    this.pacienteRepository.merge(paciente, {
      pacEstado: dto.pacEstado,
      pacFechaNac: dto.pacFechaNac,
      pacDireccion: dto.pacDireccion,
      pacCelular: dto.pacCelular,
      pacAtencionDomicilio: dto.pacAtencionDomicilio,
      smartwatch: dto.smartId
        ? await this.smartwatchRepository.findOne({
            where: { smartId: dto.smartId },
          })
        : paciente.smartwatch,
    });

    return await this.pacienteRepository.save(paciente);
  }

  async delete(persId: number): Promise<void> {
    const paciente = await this.findOne(persId);
    await this.pacienteRepository.remove(paciente);
  }
}
