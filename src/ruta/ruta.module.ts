import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Ruta } from './entities/ruta.entity';
import { RutaService } from './services/ruta.service';
import { RutaController } from './controllers/ruta.controller';
import { PersonaModule } from 'src/persona/persona.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ruta]), PersonaModule],
  providers: [RutaService],
  controllers: [RutaController],
  exports: [TypeOrmModule],
})
export class RutaModule {}
