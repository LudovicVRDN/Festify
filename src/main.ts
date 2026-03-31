import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from './utils/exeception.filter';
import { HttpExceptionFilter } from './utils/http.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new PrismaExceptionFilter(),new HttpExceptionFilter())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
