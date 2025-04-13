import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Doctor } from '../entities/doctor.entity';
import { Persona } from '../entities/persona.entity';
import { Vehiculo } from '../../vehiculo/entities/vehiculo.entity';
import { Agenda } from '../../agenda/entities/agenda.entity';
import { HospitalMunicipal } from '../../geografico/entities/hospmun.entity';
import { CreateDoctorDto } from '../dtos/create-doctor.dto';
import { UpdateDoctorDto } from '../dtos/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,
    @InjectRepository(Persona)
    private personaRepo: Repository<Persona>,
    @InjectRepository(Vehiculo)
    private vehiculoRepo: Repository<Vehiculo>,
    @InjectRepository(Agenda)
    private agendaRepo: Repository<Agenda>,
    @InjectRepository(HospitalMunicipal)
    private hospitalRepo: Repository<HospitalMunicipal>,
  ) {}

  async findAll(): Promise<Doctor[]> {
    return this.doctorRepo.find({
      relations: ['persona', 'vehiculo', 'agenda', 'hospital'],
    });
  }

  async findOne(id: number): Promise<Doctor> {
    const doctor = await this.doctorRepo.findOne({
      where: { personaId: id },
      relations: ['persona', 'vehiculo', 'agenda', 'hospital'],
    });
    if (!doctor) throw new NotFoundException(`Doctor #${id} no encontrado`);
    return doctor;
  }

  async create(dto: CreateDoctorDto): Promise<Doctor> {
    const persona = await this.personaRepo.findOneBy({
      persId: dto.personaId,
    });
    if (!persona)
      throw new NotFoundException(`Persona #${dto.personaId} no encontrada`);

    const newDoctor = this.doctorRepo.create({
      personaId: dto.personaId,
      doctorEspecialidad: dto.doctorEspecialidad,
      doctorCelular: dto.doctorCelular,
      doctorUsuario: dto.doctorUsuario,
      doctorEstado: 1,
    });

    if (dto.vehiculoId) {
      newDoctor.vehiculo = await this.vehiculoRepo.findOneBy({
        vehiId: dto.vehiculoId,
      });
      if (!newDoctor.vehiculo)
        throw new NotFoundException(
          `Vehículo #${dto.vehiculoId} no encontrado`,
        );
    }

    if (dto.agendaId) {
      newDoctor.agenda = await this.agendaRepo.findOneBy({
        agendaId: dto.agendaId,
      });
      if (!newDoctor.agenda)
        throw new NotFoundException(`Agenda #${dto.agendaId} no encontrada`);
    }

    if (dto.hospitalId) {
      newDoctor.hospital = await this.hospitalRepo.findOneBy({
        hospitalId: dto.hospitalId,
      });
      if (!newDoctor.hospital)
        throw new NotFoundException(
          `Hospital #${dto.hospitalId} no encontrado`,
        );
    }

    return this.doctorRepo.save(newDoctor);
  }

  async update(id: number, dto: UpdateDoctorDto): Promise<Doctor> {
    const doctor = await this.findOne(id);

    if (dto.doctorEspecialidad)
      doctor.doctorEspecialidad = dto.doctorEspecialidad;
    if (dto.doctorCelular) doctor.doctorCelular = dto.doctorCelular;
    if (dto.doctorUsuario) doctor.doctorUsuario = dto.doctorUsuario;

    if (dto.vehiculoId) {
      doctor.vehiculo = await this.vehiculoRepo.findOneBy({
        vehiId: dto.vehiculoId,
      });
      if (!doctor.vehiculo)
        throw new NotFoundException(
          `Vehículo #${dto.vehiculoId} no encontrado`,
        );
    }

    if (dto.agendaId) {
      doctor.agenda = await this.agendaRepo.findOneBy({
        agendaId: dto.agendaId,
      });
      if (!doctor.agenda)
        throw new NotFoundException(`Agenda #${dto.agendaId} no encontrada`);
    }

    if (dto.hospitalId) {
      doctor.hospital = await this.hospitalRepo.findOneBy({
        hospitalId: dto.hospitalId,
      });
      if (!doctor.hospital)
        throw new NotFoundException(
          `Hospital #${dto.hospitalId} no encontrado`,
        );
    }

    return this.doctorRepo.save(doctor);
  }

  async delete(id: number): Promise<void> {
    const doctor = await this.findOne(id);
    await this.doctorRepo.remove(doctor);
  }
}
