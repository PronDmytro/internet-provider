import {BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
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
  @Column({nullable: false, type: 'smalldatetime'})
  public date: Date;

  @ManyToOne((type) => OrderEntity)
  public order: OrderEntity;

  @BeforeUpdate()
  public updateStatus() {
    this.order.paymentStatus = true;
  }

}
