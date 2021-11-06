import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateWorkStatusReqDto, UpdateWorkStatusReqDto} from './dto';
import {WorkStatusEntity} from '../../entities/work-status.entity';

@Injectable()
export class WorkStatusService {

  public constructor(
    @InjectRepository(WorkStatusEntity)
    private readonly workStatusRepository: Repository<WorkStatusEntity>,
  ) {
  }

  public findAll(): Promise<WorkStatusEntity[]> {
    return this.workStatusRepository.find();
  }

  public findOne(id: string): Promise<WorkStatusEntity> {
    return this.workStatusRepository.findOne({id: id});
  }

  public async create(body: CreateWorkStatusReqDto): Promise<WorkStatusEntity> {
    const status = this.workStatusRepository.create(body);
    return await this.workStatusRepository.save(status);
  }

  public async edit(body: UpdateWorkStatusReqDto) {
    const status = await this.workStatusRepository.findOne({id: body.id});
    return await this.workStatusRepository.update(status, body);
  }

  public async delete(id: string) {
    const status = await this.workStatusRepository.findOne({id: id});
    return await this.workStatusRepository.delete(status);
  }

}
