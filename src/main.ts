import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from './utils/exeception.filter';
import { HttpExceptionFilter } from './utils/http.filter';
import { AuthGuard } from './auth/guard/auth.guard';
import { JwtService } from '@nestjs/jwt';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new PrismaExceptionFilter(),new HttpExceptionFilter());
  // app.useGlobalGuards(new AuthGuard(new JwtService()))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
