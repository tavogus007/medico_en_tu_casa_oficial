import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Macrodistrito } from '../entities/macrodistrito.entity';
import { UpdateMacrodistritoDto } from '../dtos/update-macrodistrito.dto';

@Injectable()
export class MacrodistritoService {
  constructor(
    @InjectRepository(Macrodistrito)
    private readonly macrodistritoRepository: Repository<Macrodistrito>,
  ) {}

  async findAll(): Promise<Macrodistrito[]> {
    return await this.macrodistritoRepository.find();
  }

  async findOne(id: number): Promise<Macrodistrito> {
    return this.macrodistritoRepository.findOne({
      where: { macro_id: id },
    });
  }

  async create(data: Partial<Macrodistrito>): Promise<Macrodistrito> {
    const nuevoMacrodistrito = this.macrodistritoRepository.create(data);
    return await this.macrodistritoRepository.save(nuevoMacrodistrito); // ¡Aquí se generan las fechas!
  }

  async update(
    id: number,
    data: UpdateMacrodistritoDto,
  ): Promise<Macrodistrito> {
    const nuevoMacrodistrito = await this.macrodistritoRepository.findOne({
      where: { macro_id: id },
    });
    if (!nuevoMacrodistrito)
      throw new NotFoundException(`Macrodistrito ${id} no encontrada`);

    this.macrodistritoRepository.merge(nuevoMacrodistrito, data);
    return await this.macrodistritoRepository.save(nuevoMacrodistrito); // ¡Aquí se actualiza pers_modificado!
  }

  async delete(id: number): Promise<void> {
    const macrodistrito = await this.macrodistritoRepository.findOne({
      where: { macro_id: id },
    });
    if (!macrodistrito) {
      throw new NotFoundException(`macrodistrito con ID ${id} no encontrado`);
    }
    await this.macrodistritoRepository.delete(id);
  }
}
