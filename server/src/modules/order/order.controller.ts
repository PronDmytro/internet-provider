import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {OrderService} from './order.service';
import {CreateOrderReqDto, UpdateOrderReqDto} from './dto';
import {OrderEntity} from '../../entities/order.entity';

@Controller('position')
export class OrderController {

  public constructor(
    private readonly orderService: OrderService,
  ) {
  }

  @Get('')
  public findAll(): Promise<OrderEntity[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<OrderEntity> {
    return this.orderService.findOne(id);
  }

  @Post('')
  public async create(@Body() createClientDto: CreateOrderReqDto): Promise<OrderEntity> {
    return await this.orderService.create(createClientDto);
  }

  @Put()
  public async edit(@Body() data: UpdateOrderReqDto) {
    return await this.orderService.edit(data);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await this.orderService.delete(id);
  }

}
