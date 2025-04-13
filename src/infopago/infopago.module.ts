import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InformacionPago } from './entities/infopago.entity';
import { InfopagoService } from './services/infopago.service';
import { InfoPagoController } from './controllers/infopago.controller';
import { SistemaModule } from 'src/sistema/sistema.module';

@Module({
  imports: [TypeOrmModule.forFeature([InformacionPago]), SistemaModule],
  providers: [InfopagoService],
  controllers: [InfoPagoController],
})
export class InfopagoModule {}
