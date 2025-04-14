import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { MacrodistritoService } from './services/macrodistrito.service';
import { MacrodistritoController } from './controllers/macrodistrito.controller';
import { Macrodistrito } from './entities/macrodistrito.entity';
import { DistritoController } from './controllers/distrito.controller';
import { DistritoService } from './services/distrito.service';
import { Distrito } from './entities/distrito.entity';
import { ZonaController } from './controllers/zona.controller';
import { ZonaService } from './services/zona.service';
import { Zona } from './entities/zona.entity';
import { HospitalMunicipalController } from './controllers/hospital-munic.controller';
import { HospitalMunicipalService } from './services/hospital-munic.service';
import { HospitalMunicipal } from './entities/hospmun.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Macrodistrito,
      Distrito,
      Zona,
      HospitalMunicipal,
    ]),
  ],
  providers: [
    MacrodistritoService,
    DistritoService,
    ZonaService,
    HospitalMunicipalService,
  ],
  controllers: [
    MacrodistritoController,
    DistritoController,
    ZonaController,
    HospitalMunicipalController,
  ],
  exports: [TypeOrmModule],
})
export class GeograficoModule {}
