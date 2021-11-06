import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {PaymentService} from './payment.service';
import {CreatePaymentReqDto, UpdatePaymentReqDto} from './dto';
import {PaymentEntity} from '../../entities/payment.entity';

@Controller('position')
export class PaymentController {

  public constructor(
    private readonly positionService: PaymentService,
  ) {
  }

  @Get('')
  public findAll(): Promise<PaymentEntity[]> {
    return this.positionService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<PaymentEntity> {
    return this.positionService.findOne(id);
  }

  @Post('')
  public async create(@Body() createClientDto: CreatePaymentReqDto): Promise<PaymentEntity> {
    return await this.positionService.create(createClientDto);
  }

  @Put()
  public async edit(@Body() data: UpdatePaymentReqDto) {
    return await this.positionService.edit(data);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await this.positionService.delete(id);
  }

}
