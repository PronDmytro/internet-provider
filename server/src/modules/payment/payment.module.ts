import {Module} from '@nestjs/common';
import {PaymentController} from './payment.controller';
import {PaymentService} from './payment.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PaymentEntity} from '../../entities/payment.entity';
import {OrderEntity} from '../../entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity, OrderEntity])],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {
}
