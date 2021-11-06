import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {IsString} from 'class-validator';
import {ClientEntity} from './client.entity';
import {EmployeeEntity} from './employee.entity';
import {ServiceEntity} from './service.entity';
import {WorkStatusEntity} from './work-status.entity';

@Entity('Order')
export class OrderEntity {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne((type) => ClientEntity)
  public client: ClientEntity;

  @ManyToOne((type) => EmployeeEntity)
  public contributor: EmployeeEntity;

  @IsString()
  @Column({nullable: false, type: 'smalldatetime'})
  public orderDate: Date;

  @ManyToOne((type) => ServiceEntity)
  public service: ServiceEntity;

  @ManyToOne((type) => WorkStatusEntity)
  public workStatus: WorkStatusEntity;


  @IsString()
  @Column({nullable: false, default: false})
  public paymentStatus: boolean;

}
