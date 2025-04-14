import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FormAmd } from './entities/formamd.entity';
import { FormAmdService } from './services/formamd.service';
import { FormAmdController } from './controllers/formamd.controller';

import { FormDiagnostico } from './entities/formdiag.entity';
import { FormDiagnosticoService } from './services/formdiag.service';
import { FormDiagnosticoController } from './controllers/formdiag.controller';
import { InfopagoModule } from '../infopago/infopago.module';
import { Doctor } from '../persona/entities/doctor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormAmd, FormDiagnostico, Doctor]),
    InfopagoModule,
  ],
  providers: [FormAmdService, FormDiagnosticoService],
  controllers: [FormAmdController, FormDiagnosticoController],
  exports: [TypeOrmModule], //*
})
export class FormularioModule {}
