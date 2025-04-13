import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TrabajoSocial } from '../entities/trabajoSoclal.entity';
import { Persona } from '../entities/persona.entity';
import { CreateTrabajoSocialDto } from '../dtos/create-trabsoc.dto';
import { UpdateTrabajoSocialDto } from '../dtos/update-trabsoc.dto';

@Injectable()
export class TrabajoSocialService {
  constructor(
    @InjectRepository(TrabajoSocial)
    private trabajoSocialRepo: Repository<TrabajoSocial>,
    @InjectRepository(Persona)
    private personaRepo: Repository<Persona>,
  ) {}

  async findAll(): Promise<TrabajoSocial[]> {
    return this.trabajoSocialRepo.find({ relations: ['persona'] });
  }

  async findOne(id: number): Promise<TrabajoSocial> {
    const trabajoSocial = await this.trabajoSocialRepo.findOne({
      where: { personaId: id },
      relations: ['persona'],
    });
    if (!trabajoSocial)
      throw new NotFoundException(`Trabajo Social #${id} no encontrado`);
    return trabajoSocial;
  }

  async create(dto: CreateTrabajoSocialDto): Promise<TrabajoSocial> {
    const persona = await this.personaRepo.findOneBy({
      persId: dto.personaId,
    });
    if (!persona)
      throw new NotFoundException(`Persona #${dto.personaId} no encontrada`);

    const newTrabajoSocial = this.trabajoSocialRepo.create({
      personaId: dto.personaId,
      trabajoSocialUsuario: dto.trabajoSocialUsuario,
      trabajoSocialEstado: 1,
    });

    return this.trabajoSocialRepo.save(newTrabajoSocial);
  }

  async update(
    id: number,
    dto: UpdateTrabajoSocialDto,
  ): Promise<TrabajoSocial> {
    const trabajoSocial = await this.findOne(id);

    if (dto.trabajoSocialUsuario) {
      trabajoSocial.trabajoSocialUsuario = dto.trabajoSocialUsuario;
    }

    return this.trabajoSocialRepo.save(trabajoSocial);
  }

  async delete(id: number): Promise<void> {
    const trabajoSocial = await this.findOne(id);
    await this.trabajoSocialRepo.remove(trabajoSocial);
  }
}
