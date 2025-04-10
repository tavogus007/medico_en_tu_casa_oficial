import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Doctor } from '../entities/doctor.entity';
import { Persona } from '../entities/persona.entity';
import { CreateDoctorDto } from '../dtos/create-doctor.dto';
import { UpdateDoctorDto } from '../dtos/update-doctor.dto';
import { Vehiculo } from 'src/vehiculo/entities/vehiculo.entity';
import { SiisWeb } from 'src/sistema/entities/siis.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
    @InjectRepository(Vehiculo)
    private readonly vehiculoRepository: Repository<Vehiculo>,
    @InjectRepository(SiisWeb)
    private readonly siisWebRepository: Repository<SiisWeb>,
  ) {}

  async findAll(): Promise<Doctor[]> {
    return await this.doctorRepository.find({
      relations: ['persona', 'vehiculo', 'siisWeb'],
    });
  }

  async findOne(persId: number): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne({
      where: { persId },
      relations: ['persona', 'vehiculo', 'siisWeb'],
    });

    if (!doctor) {
      throw new NotFoundException(`Doctor con ID ${persId} no encontrado`);
    }
    return doctor;
  }

  async create(dto: CreateDoctorDto): Promise<Doctor> {
    // 1. Verificar que la Persona existe
    const persona = await this.personaRepository.findOne({
      where: { persId: dto.persId },
    });
    if (!persona) {
      throw new NotFoundException(`Persona #${dto.persId} no encontrada`);
    }

    // 2. Buscar las entidades relacionadas (si se proporcionan IDs)
    const vehiculo = dto.vehiId
      ? await this.vehiculoRepository.findOne({
          where: { vehiId: dto.vehiId },
        })
      : null;
    const siisWeb = dto.siisWebId
      ? await this.siisWebRepository.findOne({
          where: { siisWebId: dto.siisWebId },
        })
      : null;

    // 3. Crear y guardar el Paciente (mapeando todos los campos)
    const doctor = this.doctorRepository.create({
      persId: dto.persId,
      docEstado: dto.docEstado || 'A',
      docEspecialidad: dto.docEspecialidad,
      docCelular: dto.docCelular,
      docUsuario: dto.docUsuario,
      vehiculo,
      siisWeb,
    });
    return await this.doctorRepository.save(doctor);
  }

  async update(persId: number, dto: UpdateDoctorDto): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne({
      where: { persId },
    });

    if (!doctor) {
      throw new NotFoundException(`Doctor con ID ${persId} no encontrado`);
    }

    this.doctorRepository.merge(doctor, {
      docEstado: dto.docEstado,
      docEspecialidad: dto.docEspecialidad,
      docCelular: dto.docCelular,
      docUsuario: dto.docUsuario,
    });

    return this.doctorRepository.save(doctor);
  }

  async delete(persId: number): Promise<void> {
    const doctor = await this.findOne(persId);
    await this.doctorRepository.remove(doctor);
  }
}
