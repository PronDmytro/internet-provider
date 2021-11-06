import {Logger, MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {pick} from 'lodash';
import {Connection} from 'typeorm';
import {LoggerMiddleware} from './core/logger/logger-middleware';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ClientModule} from './modules/client/client.module';
import conf from './conf';
import {WorkStatusEntity} from './entities/work-status.entity';
import {PaymentEntity} from './entities/payment.entity';
import {OrderEntity} from './entities/order.entity';
import {EmployeeEntity} from './entities/employee.entity';
import {ClientEntity} from './entities/client.entity';
import {PositionModule} from './modules/position/position.module';
import {EmployeeModule} from './modules/employee/employee.module';
import {PositionEntity} from './entities/position.entity';
import {ServiceEntity} from './entities/service.entity';
import {OrderModule} from './modules/order/order.module';
import {PaymentModule} from './modules/payment/payment.module';
import {ServiceModule} from './modules/service/service.module';
import {WorkStatusModule} from './modules/work-status/work-status.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(conf.typeormConfig),
    TypeOrmModule.forFeature([
      ClientEntity,
      EmployeeEntity,
      OrderEntity,
      PaymentEntity,
      PositionEntity,
      ServiceEntity,
      WorkStatusEntity,
    ]),
    ClientModule,
    PositionModule,
    EmployeeModule,
    OrderModule,
    PaymentModule,
    ServiceModule,
    WorkStatusModule,
  ],
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
