import { Module } from '@nestjs/common';
import { Smartwatch } from './entities/smartwatch.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SmartwatchService } from './services/smartwatch.service';
import { SmartwatchController } from './controllers/smartwatch.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Smartwatch])],
  providers: [SmartwatchService],
  controllers: [SmartwatchController],
  exports: [TypeOrmModule],
})
export class SmartwatchModule {}
