import {Logger, MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {pick} from 'lodash';
import {Connection} from 'typeorm';
import {LoggerMiddleware} from './core/logger/logger-middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  public constructor(private readonly connection: Connection) {
    const someConnOps = pick(connection.options, ['type', 'database', 'username']);
    new Logger('ApplicationModule').log('ApplicationModule loaded, connection: ' + JSON.stringify(someConnOps));
  }

  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }

}
