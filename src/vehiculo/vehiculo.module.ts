import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Vehiculo } from './entities/vehiculo.entity';
import { VehiculoController } from './controllers/vehiculo.controller';
import { VehiculoService } from './services/vehiculo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vehiculo])],
  providers: [VehiculoService],
  controllers: [VehiculoController],
  exports: [TypeOrmModule],
})
export class VehiculoModule {}
