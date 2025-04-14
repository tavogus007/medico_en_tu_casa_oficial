import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AgendaService } from './services/agenda.service';
import { AgendaController } from './controllers/agenda.controller';
import { Agenda } from './entities/agenda.entity';
import { PersonaModule } from 'src/persona/persona.module';

@Module({
  imports: [TypeOrmModule.forFeature([Agenda]), PersonaModule],
  providers: [AgendaService],
  controllers: [AgendaController],
  exports: [TypeOrmModule], //*
})
export class AgendaModule {}
