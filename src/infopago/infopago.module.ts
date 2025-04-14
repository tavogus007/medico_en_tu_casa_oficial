import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InformacionPago } from './entities/infopago.entity';
import { InfopagoService } from './services/infopago.service';
import { InfoPagoController } from './controllers/infopago.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InformacionPago])],
  providers: [InfopagoService],
  controllers: [InfoPagoController],
  exports: [TypeOrmModule],
})
export class InfopagoModule {}
