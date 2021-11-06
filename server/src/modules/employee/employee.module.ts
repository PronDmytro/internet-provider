import {Module} from '@nestjs/common';
import {EmployeeController} from './employee.controller';
import {EmployeeService} from './employee.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EmployeeEntity} from '../../entities/employee.entity';
import {PositionEntity} from '../../entities/position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeEntity, PositionEntity])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {
}
