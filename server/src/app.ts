import {NestApplicationOptions, ValidationPipe} from '@nestjs/common';
import {HttpAdapterHost, NestFactory} from '@nestjs/core';
import conf from './conf';
import {WinstonModule} from 'nest-winston';
import {winstonConf} from './winston-logger-conf';
import {AppModule} from './app.module';
import {AllExceptionsFilter} from './core/exceptions/all-exceptions.filter';

export async function createMainApp() {
  const appOptions: NestApplicationOptions = {
    cors: true,
    logger: WinstonModule.createLogger(winstonConf),
  };
  const app = await NestFactory.create(AppModule, appOptions);
  app.setGlobalPrefix(conf.apiUrlPath);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      disableErrorMessages: conf.env.prod,
    }),
  );

  const {httpAdapter} = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  return app;
}
