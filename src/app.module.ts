import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';

import { AuthModule } from './auth/auth.module';
import { PersonaModule } from './persona/persona.module';
import { Persona } from './persona/entities/persona.entity';
import { GeograficoModule } from './geografico/geografico.module';
import { Macrodistrito } from './geografico/entities/macrodistrito.entity';
import { Distrito } from './geografico/entities/distrito.entity';
import { Zona } from './geografico/entities/zona.entity';

import { VehiculoModule } from './vehiculo/vehiculo.module';
import { Vehiculo } from './vehiculo/entities/vehiculo.entity';
import { SmartwatchModule } from './smartwatch/smartwatch.module';
import { Smartwatch } from './smartwatch/entities/smartwatch.entity';
import { InfopagoModule } from './infopago/infopago.module';
import { InformacionPago } from './infopago/entities/infopago.entity';
import { InfoDomicilio } from './ruta/entities/infodom.entity';
import { Ruta } from './ruta/entities/ruta.entity';
import { Paciente } from './persona/entities/paciente.entity';
import { RutaModule } from './ruta/ruta.module';
import { ConstruccionRuta } from './ruta/entities/construta.entity';
import { MapaRutas } from './ruta/entities/maparuta.entity';

import { HistorialModule } from './historial/historial.module';
import { Agenda } from './agenda/entities/agenda.entity';
import { AgendaModule } from './agenda/agenda.module';
import { Doctor } from './persona/entities/doctor.entity';
import { TrabajoSocial } from './persona/entities/trabajoSoclal.entity';
import { Admisiones } from './persona/entities/admisiones.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true, // Hace que el módulo esté disponible en toda la aplicación
    }),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
          isGlobal: true,
          validationSchema: Joi.object({
            DB_HOST: Joi.string().required(),
            DB_PORT: Joi.number().required(),
            DB_USERNAME: Joi.string().required(),
            DB_PASSWORD: Joi.string().required(),
            DB_DATABASE: Joi.string().required(),
          }),
        }),
      ],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        schema: 'medico_en_tu_casa',
        entities: [
          Persona,
          Macrodistrito,
          Distrito,
          Zona,
          SiisWeb,
          Igob,
          Vehiculo,
          Smartwatch,
          InformacionPago,
          InfoDomicilio,
          Ruta,
          Paciente,
          ConstruccionRuta,
          MapaRutas,
          Historial,
          Agenda,
          Doctor,
          TrabajoSocial,
          Admisiones,
        ],
        synchronize: false, // solo en modo desarrollo
      }),
    }),
    AuthModule,
    PersonaModule,
    GeograficoModule,
    SistemaModule,
    VehiculoModule,
    SmartwatchModule,
    InfopagoModule,
    RutaModule,
    HistorialModule,
    AgendaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
