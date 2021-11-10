import {Injectable} from '@nestjs/common';
import {DeepPartial, Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateOrderReqDto, UpdateOrderReqDto} from './dto';
import {OrderEntity} from '../../entities/order.entity';
import {EmployeeEntity} from '../../entities/employee.entity';
import {merge} from 'lodash';
import {ClientEntity} from '../../entities/client.entity';
import {ServiceEntity} from '../../entities/service.entity';
import {WorkStatusEntity} from '../../entities/work-status.entity';

@Injectable()
export class OrderService {

  public constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
    @InjectRepository(WorkStatusEntity)
    private readonly workStatusRepository: Repository<WorkStatusEntity>,
  ) {
  }

  public findAll(): Promise<OrderEntity[]> {
    return this.orderRepository.find();
  }

  public findOne(id: string): Promise<OrderEntity> {
    return this.orderRepository.findOne({id: id});
  }

  public async create(body: CreateOrderReqDto): Promise<OrderEntity> {
    const contributor = await this.employeeRepository.findOne({id: body.contributor});
    const client = await this.clientRepository.findOne({id: body.client});
    const service = await this.serviceRepository.findOne({id: body.service});
    const workStatus = await this.serviceRepository.findOne({id: body.workStatus});

    const order: DeepPartial<OrderEntity> = merge(body, {
      client: client,
      contributor: contributor,
      service: service,
      workStatus: workStatus,
    });
    const createdOrder = this.orderRepository.create(order);
    return await this.orderRepository.save(createdOrder);
  }

  public async edit(body: UpdateOrderReqDto) {
    const orderNeedToUpdate = await this.orderRepository.findOne({id: body.id});

    const contributor = await this.employeeRepository.findOne({id: body.contributor});
    const client = await this.clientRepository.findOne({id: body.client});
    const service = await this.serviceRepository.findOne({id: body.service});
    const workStatus = await this.serviceRepository.findOne({id: body.workStatus});

    const order: DeepPartial<OrderEntity> = merge(body, {
      client: client,
      contributor: contributor,
      service: service,
      workStatus: workStatus,
    });
    return await this.orderRepository.update(orderNeedToUpdate, order);
  }

  public async delete(id: string) {
    const order = await this.orderRepository.findOne({id: id});
    return await this.orderRepository.delete(order);
  }

}
