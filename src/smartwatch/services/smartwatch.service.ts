import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Smartwatch } from '../entities/smartwatch.entity';
import { CreateSmartwatchDto } from '../dtos/create-smartwatch.dto';
import { UpdateSmartwatchDto } from '../dtos/update-smartwatch.dto';

@Injectable()
export class SmartwatchService {
  constructor(
    @InjectRepository(Smartwatch)
    private readonly smartwatchRepository: Repository<Smartwatch>,
  ) {}

  async create(dto: CreateSmartwatchDto): Promise<Smartwatch> {
    const newSmartwatch = this.smartwatchRepository.create({
      smartEstado: dto.smartEstado || 1,
      smartFrecCardiaca: dto.smartFrecCardiaca,
      smartPresSistolica: dto.smartPresSistolica,
      smartPresDiasistolica: dto.smartPresDiasistolica,
      smartPresO2: dto.smartPresO2,
      smartTemperatura: dto.smartTemperatura,
      smartPasos: dto.smartPasos,
      smartCaloQuem: dto.smartCaloQuem,
      smartSleepHoras: dto.smartSleepHoras,
      smartNivelEstres: dto.smartNivelEstres,
      smartActividadFisica: dto.smartActividadFisica,
    });
    return await this.smartwatchRepository.save(newSmartwatch);
  }

  async update(id: number, dto: UpdateSmartwatchDto): Promise<Smartwatch> {
    const smartwatch = await this.smartwatchRepository.findOne({
      where: { smartId: id },
    });
    if (!smartwatch)
      throw new NotFoundException(`Smartwatch #${id} no encontrado`);

    this.smartwatchRepository.merge(smartwatch, dto);
    return await this.smartwatchRepository.save(smartwatch);
  }

  async findAll(): Promise<Smartwatch[]> {
    return await this.smartwatchRepository.find();
  }

  async findOne(id: number): Promise<Smartwatch> {
    const smartwatch = await this.smartwatchRepository.findOne({
      where: { smartId: id },
    });
    if (!smartwatch)
      throw new NotFoundException(`Smartwatch #${id} no encontrado`);
    return smartwatch;
  }

  async delete(id: number): Promise<void> {
    const smartwatch = await this.findOne(id);
    await this.smartwatchRepository.remove(smartwatch);
  }
}
