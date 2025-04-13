import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PersonaService } from './services/persona.service';
import { PersonaController } from './controllers/persona.controller';
import { Persona } from './entities/persona.entity';
import { Paciente } from './entities/paciente.entity';
import { PacienteService } from './services/paciente.service';
import { PacienteController } from './controllers/paciente.controller';
import { SistemaModule } from '../sistema/sistema.module';
import { SmartwatchModule } from 'src/smartwatch/smartwatch.module';
import { RutaModule } from 'src/ruta/ruta.module';
import { Doctor } from './entities/doctor.entity';
import { DoctorService } from './services/doctor.service';
import { DoctorController } from './controllers/doctor.controller';
import { VehiculoModule } from 'src/vehiculo/vehiculo.module';
import { AdmisionesService } from './services/admision.service';
import { TrabsocialService } from './services/trabsocial.service';
import { TrabajoSocialController } from './controllers/trabajo-social.controller';
import { AdmisionesController } from './controllers/admision.controller';
import { Admisiones } from './entities/admision.entity';
import { TrabajoSocial } from './entities/trabajoSoclal.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Persona,
      Paciente,
      Doctor,
      Admisiones,
      TrabajoSocial,
    ]),
    SistemaModule,
    SmartwatchModule,
    RutaModule,
    VehiculoModule,
  ],
  providers: [
    PersonaService,
    PacienteService,
    DoctorService,
    TrabsocialService,
    AdmisionesService,
  ],
  controllers: [
    PersonaController,
    PacienteController,
    DoctorController,
    TrabajoSocialController,
    AdmisionesController,
  ],
  exports: [TypeOrmModule, PersonaService],
})
export class PersonaModule {}
