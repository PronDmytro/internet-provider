import {Injectable} from '@nestjs/common';
import {DeepPartial, Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {CreatePaymentReqDto, UpdatePaymentReqDto} from './dto';
import {PaymentEntity} from '../../entities/payment.entity';
import {OrderEntity} from '../../entities/order.entity';
import {merge} from 'lodash';

@Injectable()
export class PaymentService {

  public constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {
  }

  public findAll(): Promise<PaymentEntity[]> {
    return this.paymentRepository.find();
  }

  public findOne(id: string): Promise<PaymentEntity> {
    return this.paymentRepository.findOne({id: id});
  }

  public async create(body: CreatePaymentReqDto): Promise<PaymentEntity> {
    const order = await this.orderRepository.findOne({id: body.order});
    const payment: DeepPartial<PaymentEntity> = merge(body, {order: order});
    const createdPayment = this.paymentRepository.create(payment);
    return await this.paymentRepository.save(createdPayment);
  }

  public async edit(body: UpdatePaymentReqDto) {
    const paymentNeedToUpdate = await this.paymentRepository.findOne({id: body.id});

    const order = await this.orderRepository.findOne({id: body.order});
    const payment: DeepPartial<PaymentEntity> = merge(body, {order: order});
    return await this.paymentRepository.update(paymentNeedToUpdate, payment);
  }

  public async delete(id: string) {
    const order = await this.paymentRepository.findOne({id: id});
    return await this.paymentRepository.delete(order);
  }

}
