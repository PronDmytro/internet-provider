import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {CreateEmployeeReqDto, UpdateEmployeeReqDto} from './dto';
import {EmployeeService} from './employee.service';
import {EmployeeEntity} from '../../entities/employee.entity';

@Controller('employee')
export class EmployeeController {

  public constructor(
    private readonly employeeService: EmployeeService,
  ) {
  }

  @Get('')
  public findAll(): Promise<EmployeeEntity[]> {
    return this.employeeService.findAll();
  }

  @Get(':email')
  public findOne(@Param('email') email: string): Promise<EmployeeEntity> {
    return this.employeeService.findOne(email);
  }

  @Post('')
  public async create(@Body() createClientDto: CreateEmployeeReqDto): Promise<EmployeeEntity> {
    return await this.employeeService.create(createClientDto);
  }

  @Put()
  public async edit(@Body() data: UpdateEmployeeReqDto) {
    return await this.employeeService.edit(data);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await this.employeeService.delete(id);
  }

}
