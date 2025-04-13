import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Ruta } from '../entities/ruta.entity';
import { Doctor } from '../../persona/entities/doctor.entity';
import { CreateRutaDto } from '../dtos/create-ruta.dto';
import { UpdateRutaDto } from '../dtos/update-ruta.dto';

@Injectable()
export class RutaService {
  constructor(
    @InjectRepository(Ruta)
    private rutaRepo: Repository<Ruta>,
    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,
  ) {}

  async findAll(): Promise<Ruta[]> {
    return this.rutaRepo.find({ relations: ['doctor'] });
  }

  async findOne(id: number): Promise<Ruta> {
    const ruta = await this.rutaRepo.findOne({
      where: { rutaId: id },
      relations: ['doctor'],
    });
    if (!ruta) throw new NotFoundException(`Ruta #${id} no encontrada`);
    return ruta;
  }

  async create(dto: CreateRutaDto): Promise<Ruta> {
    const doctor = await this.doctorRepo.findOneBy({ personaId: dto.doctorId });
    if (!doctor)
      throw new NotFoundException(`Doctor #${dto.doctorId} no encontrado`);

    const newRuta = this.rutaRepo.create({
      rutaOrigen: dto.rutaOrigen,
      rutaDestino: dto.rutaDestino,
      rutaTiempoAprox: dto.rutaTiempoAprox,
      rutaEstado: 1,
      doctor,
    });

    return this.rutaRepo.save(newRuta);
  }

  async update(id: number, dto: UpdateRutaDto): Promise<Ruta> {
    const ruta = await this.findOne(id);

    if (dto.rutaOrigen) ruta.rutaOrigen = dto.rutaOrigen;
    if (dto.rutaDestino) ruta.rutaDestino = dto.rutaDestino;
    if (dto.rutaTiempoAprox) ruta.rutaTiempoAprox = dto.rutaTiempoAprox;

    if (dto.doctorId) {
      ruta.doctor = await this.doctorRepo.findOneBy({
        personaId: dto.doctorId,
      });
      if (!ruta.doctor)
        throw new NotFoundException(`Doctor #${dto.doctorId} no encontrado`);
    }

    return this.rutaRepo.save(ruta);
  }

  async delete(id: number): Promise<void> {
    const ruta = await this.findOne(id);
    await this.rutaRepo.remove(ruta);
  }
}
