import {Module} from '@nestjs/common';
import {WorkStatusController} from './work-status.controller';
import {WorkStatusService} from './work-status.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {WorkStatusEntity} from '../../entities/work-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkStatusEntity])],
  controllers: [WorkStatusController],
  providers: [WorkStatusService],
  exports: [WorkStatusService],
})
export class WorkStatusModule {
}
