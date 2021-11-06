import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {IsString} from 'class-validator';

@Entity('WorkStatus')
export class WorkStatusEntity {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @IsString()
  @Column({unique: true, nullable: false})
  public statusName: string;

}
