import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateServiceReqDto, UpdateServiceReqDto} from './dto';
import {ServiceEntity} from '../../entities/service.entity';

@Injectable()
export class ServiceService {

  public constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
  ) {
  }

  public findAll(): Promise<ServiceEntity[]> {
    return this.serviceRepository.find();
  }

  public findOne(id: string): Promise<ServiceEntity> {
    return this.serviceRepository.findOne({id: id});
  }

  public async create(body: CreateServiceReqDto): Promise<ServiceEntity> {
    const service = this.serviceRepository.create(body);
    return await this.serviceRepository.save(service);
  }

  public async edit(body: UpdateServiceReqDto) {
    const service = await this.serviceRepository.findOne({id: body.id});
    return await this.serviceRepository.update(service, body);
  }

  public async delete(id: string) {
    const service = await this.serviceRepository.findOne({id: id});
    return await this.serviceRepository.delete(service);
  }

}
