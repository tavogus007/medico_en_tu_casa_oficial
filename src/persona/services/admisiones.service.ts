import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Admisiones } from '../entities/admisiones.entity';
import { Persona } from '../entities/persona.entity';
import { CreateAdmisionDto } from '../dtos/create-admision.dto';
import { UpdateAdmisionDto } from '../dtos/update-admision.dto';

@Injectable()
export class AdmisionesService {
  constructor(
    @InjectRepository(Admisiones)
    private readonly admisionesRepository: Repository<Admisiones>,
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

  async findAll(): Promise<Admisiones[]> {
    return await this.admisionesRepository.find({
      relations: ['persona'],
    });
  }

  async findOne(persId: number): Promise<Admisiones> {
    const admision = await this.admisionesRepository.findOne({
      where: { persId },
      relations: ['persona'],
    });

    if (!admision) {
      throw new NotFoundException(`Admision con ID ${persId} no encontrado`);
    }
    return admision;
  }

  async create(dto: CreateAdmisionDto): Promise<Admisiones> {
    // 1. Verificar que la Persona existe
    const persona = await this.personaRepository.findOne({
      where: { persId: dto.persId },
    });
    if (!persona) {
      throw new NotFoundException(`Persona #${dto.persId} no encontrada`);
    }

    // 2. Buscar las entidades relacionadas (si se proporcionan IDs)
    // 3. Crear y guardar la Admision (mapeando todos los campos)
    const admision = this.admisionesRepository.create({
      persId: dto.persId,
      admEstado: dto.admEstado || 'A',
      admUsuario: dto.admUsuario,
    });
    return await this.admisionesRepository.save(admision);
  }

  async update(persId: number, dto: UpdateAdmisionDto): Promise<Admisiones> {
    const admision = await this.admisionesRepository.findOne({
      where: { persId },
    });

    if (!admision) {
      throw new NotFoundException(`Admision con ID ${persId} no encontrado`);
    }

    this.admisionesRepository.merge(admision, {
      admEstado: dto.admEstado,
      admUsuario: dto.admUsuario,
    });

    return this.admisionesRepository.save(admision);
  }

  async delete(persId: number): Promise<void> {
    const admision = await this.findOne(persId);
    await this.admisionesRepository.remove(admision);
  }
}
