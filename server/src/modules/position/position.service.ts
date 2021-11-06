import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {CreatePositionReqDto, UpdatePositionReqDto} from './dto';
import {PositionEntity} from '../../entities/position.entity';

@Injectable()
export class PositionService {

  public constructor(
    @InjectRepository(PositionEntity)
    private readonly positionEntityRepository: Repository<PositionEntity>,
  ) {
  }

  public findAll(): Promise<PositionEntity[]> {
    return this.positionEntityRepository.find();
  }

  public findOne(id: string): Promise<PositionEntity> {
    return this.positionEntityRepository.findOne({id: id});
  }

  public async create(body: CreatePositionReqDto): Promise<PositionEntity> {
    const position = this.positionEntityRepository.create(body);
    // @ts-ignore
    return await this.positionEntityRepository.save(position);
  }

  public async edit(body: UpdatePositionReqDto) {
    const client = await this.positionEntityRepository.findOne({id: body.id});
    return await this.positionEntityRepository.update(client, body);
  }

  public async delete(id: string) {
    const client = await this.positionEntityRepository.findOne({id: id});
    return await this.positionEntityRepository.delete(client);
  }

}
