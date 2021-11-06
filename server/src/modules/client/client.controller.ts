import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {CreateClientReqDto, UpdateClientReqDto} from './dto';
import {ClientService} from './client.service';
import {ClientEntity} from '../../entities/client.entity';

@Controller('client')
export class ClientController {

  public constructor(
    private readonly clientService: ClientService,
  ) {
  }

  @Get('')
  public findAll(): Promise<ClientEntity[]> {
    return this.clientService.findAll();
  }

  @Get(':email')
  public findOne(@Param('email') email: string): Promise<ClientEntity> {
    return this.clientService.findOne(email);
  }

  @Post('')
  public async create(@Body() createClientDto: CreateClientReqDto): Promise<ClientEntity> {
    return await this.clientService.create(createClientDto);
  }

  @Put()
  public async edit(@Body() data: UpdateClientReqDto) {
    return await this.clientService.edit(data);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await this.clientService.delete(id);
  }

}
