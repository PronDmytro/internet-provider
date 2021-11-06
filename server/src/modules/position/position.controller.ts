import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {PositionService} from './position.service';
import {CreatePositionReqDto, UpdatePositionReqDto} from './dto';
import {PositionEntity} from '../../entities/position.entity';

@Controller('position')
export class PositionController {

  public constructor(
    private readonly positionService: PositionService,
  ) {
  }

  @Get('')
  public findAll(): Promise<PositionEntity[]> {
    return this.positionService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<PositionEntity> {
    return this.positionService.findOne(id);
  }

  @Post('')
  public async create(@Body() createClientDto: CreatePositionReqDto): Promise<PositionEntity> {
    return await this.positionService.create(createClientDto);
  }

  @Put()
  public async edit(@Body() data: UpdatePositionReqDto) {
    return await this.positionService.edit(data);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await this.positionService.delete(id);
  }

}
