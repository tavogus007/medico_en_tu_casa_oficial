import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Admision } from '../entities/admision.entity';
import { Persona } from '../entities/persona.entity';
import { CreateAdmisionDto } from '../dtos/create-admision.dto';
import { UpdateAdmisionDto } from '../dtos/update-admision.dto';

@Injectable()
export class AdmisionService {
  constructor(
    @InjectRepository(Admision)
    private admisionRepo: Repository<Admision>,
    @InjectRepository(Persona)
    private personaRepo: Repository<Persona>,
  ) {}

  async findAll(): Promise<Admision[]> {
    return this.admisionRepo.find({ relations: ['persona'] });
  }

  async findOne(id: number): Promise<Admision> {
    const admision = await this.admisionRepo.findOne({
      where: { personaId: id },
      relations: ['persona'],
    });
    if (!admision) throw new NotFoundException(`Admisión #${id} no encontrada`);
    return admision;
  }

  async create(dto: CreateAdmisionDto): Promise<Admision> {
    const persona = await this.personaRepo.findOneBy({
      persId: dto.personaId,
    });
    if (!persona)
      throw new NotFoundException(`Persona #${dto.personaId} no encontrada`);

    const newAdmision = this.admisionRepo.create({
      personaId: dto.personaId,
      admisionUsuario: dto.admisionUsuario,
      admisionEstado: 1,
    });

    return this.admisionRepo.save(newAdmision);
  }

  async update(id: number, dto: UpdateAdmisionDto): Promise<Admision> {
    const admision = await this.findOne(id);

    if (dto.admisionUsuario) {
      admision.admisionUsuario = dto.admisionUsuario;
    }

    return this.admisionRepo.save(admision);
  }

  async delete(id: number): Promise<void> {
    const admision = await this.findOne(id);
    await this.admisionRepo.remove(admision);
  }
}
