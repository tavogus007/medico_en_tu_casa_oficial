import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PersonaService } from './services/persona.service';
import { PersonaController } from './controllers/persona.controller';
import { Persona } from './entities/persona.entity';
import { Paciente } from './entities/paciente.entity';
import { PacienteService } from './services/paciente.service';
import { PacienteController } from './controllers/paciente.controller';
import { Doctor } from './entities/doctor.entity';
import { DoctorService } from './services/doctor.service';
import { DoctorController } from './controllers/doctor.controller';
import { AdmisionService } from './services/admision.service';
import { TrabajoSocialService } from './services/trabsocial.service';
import { TrabajoSocialController } from './controllers/trabajo-social.controller';
import { AdmisionController } from './controllers/admision.controller';
import { Admision } from './entities/admision.entity';
import { TrabajoSocial } from './entities/trabajoSoclal.entity';
import { SmartwatchModule } from 'src/smartwatch/smartwatch.module';
import { FormularioModule } from 'src/formularios/formulario.module';
import { Agenda } from 'src/agenda/entities/agenda.entity';
import { VehiculoModule } from 'src/vehiculo/vehiculo.module';
import { GeograficoModule } from 'src/geografico/geografico.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Persona,
      Paciente,
      Doctor,
      Admision,
      TrabajoSocial,
      Agenda,
    ]),
    SmartwatchModule,
    FormularioModule,
    VehiculoModule,
    GeograficoModule,
  ],
  providers: [
    PersonaService,
    PacienteService,
    DoctorService,
    TrabajoSocialService,
    AdmisionService,
  ],
  controllers: [
    PersonaController,
    PacienteController,
    DoctorController,
    TrabajoSocialController,
    AdmisionController,
  ],
  exports: [TypeOrmModule],
})
export class PersonaModule {}
