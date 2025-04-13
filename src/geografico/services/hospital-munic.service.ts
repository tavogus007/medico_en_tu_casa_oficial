import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HospitalMunicipal } from '../entities/hospmun.entity';
import { UpdateHospitalMunicipalDto } from '../dtos/update-hospmun.dto';
import { Zona } from '../entities/zona.entity';
import { CreateHospitalMunicipalDto } from '../dtos/create-hospmun.dto';

@Injectable()
export class HospitalMunicipalService {
  constructor(
    @InjectRepository(HospitalMunicipal)
    private hospitalRepo: Repository<HospitalMunicipal>,
    @InjectRepository(Zona)
    private zonaRepo: Repository<Zona>,
  ) {}

  async findAll(): Promise<HospitalMunicipal[]> {
    return this.hospitalRepo.find({ relations: ['zona'] });
  }

  async findOne(id: number): Promise<HospitalMunicipal> {
    const hospital = await this.hospitalRepo.findOne({
      where: { hospitalId: id },
      relations: ['zona'],
    });
    if (!hospital) throw new NotFoundException(`Hospital #${id} no encontrado`);
    return hospital;
  }

  async create(dto: CreateHospitalMunicipalDto): Promise<HospitalMunicipal> {
    const zona = await this.zonaRepo.findOne({
      where: { zona_id: dto.hospitalZonaId },
    });
    if (!zona)
      throw new NotFoundException(`Zona #${dto.hospitalZonaId} no encontrada`);

    const nuevoHospital = this.hospitalRepo.create({
      hospitalNombre: dto.hospitalNombre,
      hospitalNivel: dto.hospitalNivel,
      hospitalDireccion: dto.hospitalDireccion,
      hospitalTelefono: dto.hospitalTelefono,
      hospitalDescripcion: dto.hospitalDescripcion,
      hospitalCodigo: dto.hospitalCodigo,
      hospitalEstado: dto.hospitalEstado || 1,
      zona,
    });

    return this.hospitalRepo.save(nuevoHospital);
  }

  async update(
    id: number,
    dto: UpdateHospitalMunicipalDto,
  ): Promise<HospitalMunicipal> {
    const hospital = await this.findOne(id);

    if (dto.hospitalZonaId) {
      hospital.zona = await this.zonaRepo.findOne({
        where: { zona_id: dto.hospitalZonaId },
      });
      if (!hospital.zona)
        throw new NotFoundException(
          `Zona #${dto.hospitalZonaId} no encontrada`,
        );
    }

    if (dto.hospitalNombre) hospital.hospitalNombre = dto.hospitalNombre;
    if (dto.hospitalNivel) hospital.hospitalNivel = dto.hospitalNivel;
    if (dto.hospitalDireccion)
      hospital.hospitalDireccion = dto.hospitalDireccion;
    if (dto.hospitalTelefono) hospital.hospitalTelefono = dto.hospitalTelefono;
    if (dto.hospitalDescripcion)
      hospital.hospitalDescripcion = dto.hospitalDescripcion;
    if (dto.hospitalCodigo) hospital.hospitalCodigo = dto.hospitalCodigo;
    if (dto.hospitalEstado) hospital.hospitalEstado = dto.hospitalEstado;

    return this.hospitalRepo.save(hospital);
  }

  async delete(id: number): Promise<void> {
    const hospital = await this.findOne(id);
    await this.hospitalRepo.remove(hospital);
  }
}
