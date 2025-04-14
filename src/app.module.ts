import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';

import { AgendaModule } from './agenda/agenda.module';
import { FormularioModule } from './formularios/formulario.module';
import { GeograficoModule } from './geografico/geografico.module';
import { InfopagoModule } from './infopago/infopago.module';
import { PersonaModule } from './persona/persona.module';
import { RutaModule } from './ruta/ruta.module';
import { SmartwatchModule } from './smartwatch/smartwatch.module';
import { VehiculoModule } from './vehiculo/vehiculo.module';

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
        autoLoadEntities: true, // Carga automáticamente todas las entidades
        synchronize: false, // solo en modo desarrollo
      }),
    }),
    AgendaModule,
    FormularioModule,
    GeograficoModule,
    InfopagoModule,
    PersonaModule,
    RutaModule,
    SmartwatchModule,
    VehiculoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
