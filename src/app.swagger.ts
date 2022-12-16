import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('mockterview-backend API Docs')
    .setDescription('template Nest.js 서버의 API 문서입니다.')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
}
