import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {CreateWorkStatusReqDto, UpdateWorkStatusReqDto} from './dto';
import {WorkStatusService} from './work-status.service';
import {WorkStatusEntity} from '../../entities/work-status.entity';

@Controller('client')
export class WorkStatusController {

  public constructor(
    private readonly workStatusService: WorkStatusService,
  ) {
  }

  @Get('')
  public findAll(): Promise<WorkStatusEntity[]> {
    return this.workStatusService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') email: string): Promise<WorkStatusEntity> {
    return this.workStatusService.findOne(email);
  }

  @Post('')
  public async create(@Body() createClientDto: CreateWorkStatusReqDto): Promise<WorkStatusEntity> {
    return await this.workStatusService.create(createClientDto);
  }

  @Put()
  public async edit(@Body() data: UpdateWorkStatusReqDto) {
    return await this.workStatusService.edit(data);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await this.workStatusService.delete(id);
  }

}
