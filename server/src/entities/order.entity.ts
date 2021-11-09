import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {IsString} from 'class-validator';
import {ClientEntity} from './client.entity';
import {EmployeeEntity} from './employee.entity';
import {ServiceEntity} from './service.entity';
import {WorkStatusEntity} from './work-status.entity';

@Entity('Order')
export class OrderEntity {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne((type) => ClientEntity, {eager: true})
  @JoinColumn()
  public client: ClientEntity;

  @ManyToOne((type) => EmployeeEntity, {eager: true})
  @JoinColumn()
  public contributor: EmployeeEntity;

  @IsString()
  @Column({nullable: false, type: 'smalldatetime'})
  public orderDate: Date;

  @ManyToOne((type) => ServiceEntity, {eager: true})
  @JoinColumn()
  public service: ServiceEntity;

  @ManyToOne((type) => WorkStatusEntity, {eager: true})
  @JoinColumn()
  public workStatus: WorkStatusEntity;


  @IsString()
  @Column({nullable: false, default: false})
  public paymentStatus: boolean;

}
