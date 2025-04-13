import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Persona } from '../../persona/entities/persona.entity';
import { UpdatePersonaDto } from '../../persona/dtos/update-persona.dto';

@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

  async findAll(): Promise<Persona[]> {
    return await this.personaRepository.find();
  }

  async findOne(id: number): Promise<Persona> {
    return this.personaRepository.findOne({
      where: { persId: id },
    });
  }

  async create(data: Partial<Persona>): Promise<Persona> {
    const nuevaPersona = this.personaRepository.create(data);
    return await this.personaRepository.save(nuevaPersona); // ¡Aquí se generan las fechas!
  }

  async update(id: number, data: UpdatePersonaDto): Promise<Persona> {
    const persona = await this.personaRepository.findOne({
      where: { persId: id },
    });
    if (!persona) throw new NotFoundException(`Persona ${id} no encontrada`);

    this.personaRepository.merge(persona, data);
    return await this.personaRepository.save(persona); // ¡Aquí se actualiza pers_modificado!
  }

  async delete(id: number): Promise<void> {
    const persona = await this.personaRepository.findOne({
      where: { persId: id },
    });
    if (!persona) {
      throw new NotFoundException(`Persona con ID ${id} no encontrado`);
    }
    await this.personaRepository.delete(id);
  }
}
