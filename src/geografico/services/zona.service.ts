import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Zona } from '../entities/zona.entity';
import { Distrito } from '../entities/distrito.entity';
import { CreateZonaDto } from '../dtos/create-zona.dto';
import { UpdateZonaDto } from '../dtos/update-zona.dto';

@Injectable()
export class ZonaService {
  constructor(
    @InjectRepository(Zona) private zonaRepo: Repository<Zona>,
    @InjectRepository(Distrito) private distritoRepo: Repository<Distrito>,
  ) {}

  async findAll(): Promise<Zona[]> {
    return this.zonaRepo.find({ relations: ['distrito'] });
  }

  async findOne(id: number): Promise<Zona> {
    const zona = await this.zonaRepo.findOne({
      where: { zona_id: id },
      relations: ['distrito'],
    });
    if (!zona) throw new NotFoundException(`Zona #${id} no encontrada`);
    return zona;
  }

  async create(dto: CreateZonaDto): Promise<Zona> {
    const distrito = await this.distritoRepo.findOne({
      where: { dist_id: dto.distId },
    });
    if (!distrito) {
      throw new NotFoundException(`Distrito #${dto.distId} no encontrado`);
    }

    const nuevaZona = this.zonaRepo.create({
      zonaNombre: dto.zonaNombre,
      zonaEstado: dto.zonaEstado || 1,
      distrito,
    });

    return this.zonaRepo.save(nuevaZona);
  }

  async update(id: number, dto: UpdateZonaDto): Promise<Zona> {
    const zona = await this.findOne(id);

    if (dto.distId) {
      zona.distrito = await this.distritoRepo.findOne({
        where: { dist_id: dto.distId },
      });
      if (!zona.distrito)
        throw new NotFoundException(`Distrito #${dto.distId} no encontrado`);
    }

    if (dto.zonaNombre) zona.zonaNombre = dto.zonaNombre;
    if (dto.zonaEstado) zona.zonaEstado = dto.zonaEstado;

    return this.zonaRepo.save(zona);
  }

  async delete(id: number): Promise<void> {
    const zona = await this.findOne(id);
    await this.zonaRepo.remove(zona);
  }
}
