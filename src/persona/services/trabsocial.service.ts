import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TrabajoSocial } from '../entities/trabajoSoclal.entity';
import { Persona } from '../entities/persona.entity';
import { CreateTrabajoSocialDto } from '../dtos/create-trabsoc.dto';
import { UpdateTrabajoSocialDto } from '../dtos/update-trabsoc.dto';

@Injectable()
export class TrabsocialService {
  constructor(
    @InjectRepository(TrabajoSocial)
    private readonly trabajoSocialRepository: Repository<TrabajoSocial>,
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

  async findAll(): Promise<TrabajoSocial[]> {
    return await this.trabajoSocialRepository.find({
      relations: ['persona'],
    });
  }

  async findOne(persId: number): Promise<TrabajoSocial> {
    const trabSoc = await this.trabajoSocialRepository.findOne({
      where: { persId },
      relations: ['persona'],
    });

    if (!trabSoc) {
      throw new NotFoundException(`trabSoc con ID ${persId} no encontrado`);
    }
    return trabSoc;
  }

  async create(dto: CreateTrabajoSocialDto): Promise<TrabajoSocial> {
    // 1. Verificar que la Persona existe
    const persona = await this.personaRepository.findOne({
      where: { persId: dto.persId },
    });
    if (!persona) {
      throw new NotFoundException(`Persona #${dto.persId} no encontrada`);
    }

    // 2. Buscar las entidades relacionadas (si se proporcionan IDs)
    // 3. Crear y guardar la Admision (mapeando todos los campos)
    const trabSoc = this.trabajoSocialRepository.create({
      persId: dto.persId,
      tsEstado: dto.tsEstado || 'A',
      tsUsuario: dto.tsUsuario,
    });
    return await this.trabajoSocialRepository.save(trabSoc);
  }

  async update(
    persId: number,
    dto: UpdateTrabajoSocialDto,
  ): Promise<TrabajoSocial> {
    const trabSoc = await this.trabajoSocialRepository.findOne({
      where: { persId },
    });

    if (!trabSoc) {
      throw new NotFoundException(`trabSoc con ID ${persId} no encontrado`);
    }

    this.trabajoSocialRepository.merge(trabSoc, {
      tsEstado: dto.tsEstado,
      tsUsuario: dto.tsUsuario,
    });

    return this.trabajoSocialRepository.save(trabSoc);
  }

  async delete(persId: number): Promise<void> {
    const trabSoc = await this.findOne(persId);
    await this.trabajoSocialRepository.remove(trabSoc);
  }
}
