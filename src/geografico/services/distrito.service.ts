import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Distrito } from '../entities/distrito.entity';
import { UpdateDistritoDto } from '../dtos/update-distrito.dto';
import { Macrodistrito } from '../entities/macrodistrito.entity';
import { CreateDistritoDto } from '../dtos/create-distrito.dto';

@Injectable()
export class DistritoService {
  constructor(
    @InjectRepository(Distrito) private distritoRepo: Repository<Distrito>,
    @InjectRepository(Macrodistrito)
    private macroRepo: Repository<Macrodistrito>,
  ) {}

  async findAll(): Promise<Distrito[]> {
    return this.distritoRepo.find({ relations: ['macrodistrito'] });
  }

  async findOne(id: number): Promise<Distrito> {
    const distrito = await this.distritoRepo.findOne({
      where: { dist_id: id },
      relations: ['macrodistrito'],
    });
    if (!distrito) throw new NotFoundException(`Distrito #${id} no encontrado`);
    return distrito;
  }

  async create(dto: CreateDistritoDto): Promise<Distrito> {
    const macrodistrito = await this.macroRepo.findOne({
      where: { macro_id: dto.macroId },
    });
    if (!macrodistrito)
      throw new NotFoundException(
        `Macrodistrito #${dto.macroId} no encontrado`,
      );

    const nuevoDistrito = this.distritoRepo.create({
      distNro: dto.distNro,
      distEstado: dto.distEstado || 1,
      macrodistrito,
    });

    return this.distritoRepo.save(nuevoDistrito);
  }

  async update(id: number, dto: UpdateDistritoDto): Promise<Distrito> {
    const distrito = await this.findOne(id); // Reutilizamos el método findOne

    if (dto.macroId) {
      distrito.macrodistrito = await this.macroRepo.findOne({
        where: { macro_id: dto.macroId },
      });
      if (!distrito.macrodistrito)
        throw new NotFoundException(
          `Macrodistrito #${dto.macroId} no encontrado`,
        );
    }

    if (dto.distNro) distrito.distNro = dto.distNro;
    if (dto.distEstado) distrito.distEstado = dto.distEstado;

    return this.distritoRepo.save(distrito);
  }

  async delete(id: number): Promise<void> {
    const distrito = await this.findOne(id); // Reutilizamos el método findOne
    await this.distritoRepo.remove(distrito);
  }
}
