import {Injectable} from '@nestjs/common';
import {ClientEntity} from '../../entities/client.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateClientReqDto, UpdateClientReqDto} from './dto';

@Injectable()
export class ClientService {

  public constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {
  }

  public findAll(): Promise<ClientEntity[]> {
    return this.clientRepository.find();
  }

  public findOne(email: string): Promise<ClientEntity> {
    return this.clientRepository.findOne({email: email});
  }

  public async create(body: CreateClientReqDto): Promise<ClientEntity> {
    const client = this.clientRepository.create(body);
    return await this.clientRepository.save(client);
  }

  public async edit(body: UpdateClientReqDto) {
    const client = await this.clientRepository.findOne({id: body.id});
    return await this.clientRepository.update(client, body);
  }

  public async delete(id: string) {
    const client = await this.clientRepository.findOne({id: id});
    return await this.clientRepository.delete(client);
  }

}
