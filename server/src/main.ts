import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔹 Raw body for Stripe webhook
  app.use('/api/webhook', bodyParser.raw({ type: 'application/json' }));

  // 🔹 JSON body for all other routes
  app.use(express.json());

  // 🔹 Allow frontend to call backend
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://free-realm-quickshow.netlify.app',
    ],

    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
