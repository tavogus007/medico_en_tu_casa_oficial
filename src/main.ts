import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true }); //Poner esto como true, permite que las API se puedan consumir desde otros lugares

  const config = new DocumentBuilder()
    .setTitle('DOCUMENTACION DE APIs - MEDICO EN TU CASA')
    .setDescription(
      'En esta ventana, se utilizará swagger para documentar las APIs. <br>Esta pertenece a OpenAPI de NestJS, es un formato de definicion de lenguaje agnostico usado para describir RESTful APIs',
    )
    .setVersion('1.0')
    //.addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
