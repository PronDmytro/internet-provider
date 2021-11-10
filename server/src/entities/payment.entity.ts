import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {IsString} from 'class-validator';
import {OrderEntity} from './order.entity';

@Entity('Payment')
export class PaymentEntity {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @IsString()
  @Column({nullable: false})
  public sum: number;

  @IsString()
  @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
  public date: Date;

  @ManyToOne((type) => OrderEntity, {eager: true})
  @JoinColumn()
  public order: OrderEntity;

}
