import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {IsString} from 'class-validator';

@Entity('Service')
export class ServiceEntity {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @IsString()
  @Column({unique: true, nullable: false, length: 50})
  public name: string;

  @Column({nullable: false})
  public serviceCost: number;

  @Column({default: 0})
  public connectionCost: number;

}
