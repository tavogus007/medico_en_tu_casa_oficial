import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehiculo } from '../entities/vehiculo.entity';
import { CreateVehiculoDto } from '../dtos/create-vehiculo.dto';
import { UpdateVehiculoDto } from '../dtos/update-vehiculo.dto';

@Injectable()
export class VehiculoService {
  constructor(
    @InjectRepository(Vehiculo)
    private readonly vehiculoRepository: Repository<Vehiculo>,
  ) {}

  async create(dto: CreateVehiculoDto): Promise<Vehiculo> {
    const newVehiculo = this.vehiculoRepository.create({
      vehiPlaca: dto.vehiPlaca,
      vehiEstado: dto.vehiEstado || 'A',
      vehiDescripcionEstado: dto.vehiDescripcionEstado,
      vehiKilometraje: dto.vehiKilometraje,
    });
    return await this.vehiculoRepository.save(newVehiculo);
  }

  async update(id: number, dto: UpdateVehiculoDto): Promise<Vehiculo> {
    const vehiculo = await this.vehiculoRepository.findOne({
      where: { vehiId: id },
    });
    if (!vehiculo) throw new NotFoundException(`Vehículo #${id} no encontrado`);

    this.vehiculoRepository.merge(vehiculo, dto);
    return await this.vehiculoRepository.save(vehiculo);
  }

  async findAll(): Promise<Vehiculo[]> {
    return await this.vehiculoRepository.find();
  }

  async findOne(id: number): Promise<Vehiculo> {
    const vehiculo = await this.vehiculoRepository.findOne({
      where: { vehiId: id },
    });
    if (!vehiculo) throw new NotFoundException(`Vehículo #${id} no encontrado`);
    return vehiculo;
  }

  async delete(id: number): Promise<void> {
    const vehiculo = await this.findOne(id);
    await this.vehiculoRepository.remove(vehiculo);
  }
}
