import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {IsString} from 'class-validator';

@Entity('Position')
export class PositionEntity {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @IsString()
  @Column({unique: true, nullable: false})
  public name: string;

  @IsString()
  @Column({unique: true, nullable: false})
  public responsibilities: string;

  @IsString()
  @Column()
  public salary: number;

}
