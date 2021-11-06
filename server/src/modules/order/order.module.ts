import {Module} from '@nestjs/common';
import {OrderController} from './order.controller';
import {OrderService} from './order.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {OrderEntity} from '../../entities/order.entity';
import {EmployeeEntity} from '../../entities/employee.entity';
import {ClientEntity} from '../../entities/client.entity';
import {ServiceEntity} from '../../entities/service.entity';
import {WorkStatusEntity} from '../../entities/work-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [
      OrderEntity,
      EmployeeEntity,
      ClientEntity,
      ServiceEntity,
      WorkStatusEntity,
    ],
  )],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {
}
