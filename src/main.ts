import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { HttpExceptionFilter } from './lib/exceptions/HttpException';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter)
  await app.listen(process.env.APP_PORT);
}
bootstrap();
