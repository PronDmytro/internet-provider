import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ServiceController} from './service.controller';
import {ServiceService} from './service.service';
import {ServiceEntity} from '../../entities/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceEntity])],
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [ServiceService],
})
export class ServiceModule {
}
