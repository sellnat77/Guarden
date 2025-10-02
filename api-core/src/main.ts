import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://dashboard:3000/',
      'http://dashboard:5000/',
      'http://localhost:3000',
    ],
  });
  console.log(process.env.PORT);
  await app.listen(3000);
}
bootstrap();
