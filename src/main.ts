import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'body-parser';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.Interceptor';

const bodyParser = require('body-parser');
const bodParserOptions = {
  type: req => !req.is('multipart/!*'),
  limit: `${1}mb`,
};

async function bootstrap() {
  const globalPrefix: string = 'api/v1';
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,

  });
  app.setGlobalPrefix(globalPrefix);
  app.use(json());
  app.use(bodyParser.raw(bodParserOptions));
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new ErrorsInterceptor());
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.enableCors();

  await app.listen(3000);
}

bootstrap();
