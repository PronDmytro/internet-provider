import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {PaymentService} from './payment.service';
import {CreatePaymentReqDto, UpdatePaymentReqDto} from './dto';
import {PaymentEntity} from '../../entities/payment.entity';

@Controller('payment')
export class PaymentController {

  public constructor(
    private readonly paymentService: PaymentService,
  ) {
  }

  @Get('')
  public findAll(): Promise<PaymentEntity[]> {
    return this.paymentService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<PaymentEntity> {
    return this.paymentService.findOne(id);
  }

  @Post('')
  public async create(@Body() createClientDto: CreatePaymentReqDto): Promise<PaymentEntity> {
    return await this.paymentService.create(createClientDto);
  }

  @Put()
  public async edit(@Body() data: UpdatePaymentReqDto) {
    return await this.paymentService.edit(data);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await this.paymentService.delete(id);
  }

}
