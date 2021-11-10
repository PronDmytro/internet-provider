import {Injectable} from '@nestjs/common';
import {DeepPartial, Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {EmployeeEntity} from '../../entities/employee.entity';
import {CreateEmployeeReqDto, UpdateEmployeeReqDto} from './dto';
import {PositionEntity} from '../../entities/position.entity';
import {merge} from 'lodash';

@Injectable()
export class EmployeeService {

  public constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
    @InjectRepository(PositionEntity)
    private readonly positionRepository: Repository<PositionEntity>,
  ) {
  }

  public async findAll(): Promise<EmployeeEntity[]> {
    console.log(await this.employeeRepository.find());
    return this.employeeRepository.find();
  }

  public findOne(email: string): Promise<EmployeeEntity> {
    return this.employeeRepository.findOne({email: email});
  }

  public async create(body: CreateEmployeeReqDto): Promise<EmployeeEntity> {
    const position = await this.positionRepository.findOne({id: body.position});

    const employee: DeepPartial<EmployeeEntity> = merge(body, {position: position});
    const createdEmployee = this.employeeRepository.create(employee);
    return await this.employeeRepository.save(createdEmployee);
  }

  public async edit(body: UpdateEmployeeReqDto) {
    const employeeNeedToUpdate = await this.employeeRepository.findOne({id: body.id});

    const position = await this.positionRepository.findOne({id: body.position});
    const employee: DeepPartial<EmployeeEntity> = merge(body, {position: position});
    return await this.employeeRepository.update(employeeNeedToUpdate, employee);
  }

  public async delete(id: string) {
    const client = await this.employeeRepository.findOne({id: id});
    return await this.employeeRepository.delete(client);
  }

}
