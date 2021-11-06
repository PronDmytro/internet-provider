import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ServiceService} from './service.service';
import {CreateServiceReqDto, UpdateServiceReqDto} from './dto';
import {ServiceEntity} from '../../entities/service.entity';

@Controller('position')
export class ServiceController {

  public constructor(
    private readonly serviceService: ServiceService,
  ) {
  }

  @Get('')
  public findAll(): Promise<ServiceEntity[]> {
    return this.serviceService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<ServiceEntity> {
    return this.serviceService.findOne(id);
  }

  @Post('')
  public async create(@Body() createClientDto: CreateServiceReqDto): Promise<ServiceEntity> {
    return await this.serviceService.create(createClientDto);
  }

  @Put()
  public async edit(@Body() data: UpdateServiceReqDto) {
    return await this.serviceService.edit(data);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await this.serviceService.delete(id);
  }

}
