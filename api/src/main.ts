import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

async function bootstrap() {
  if (!process.env.NODE_ENV) {
    throw new Error(
      `Environment variables not loaded. Ensure .env file is configured.`,
    );
  }

  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Conference Booking API')
    .setDescription('API documentation for the Conference Booking application')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }) // Add Bearer Auth globally
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
