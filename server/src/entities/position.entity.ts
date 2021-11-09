import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {IsString} from 'class-validator';
import {EmployeeEntity} from './employee.entity';

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

  @OneToMany(() => EmployeeEntity, (employee) => employee.position)
  public employees: EmployeeEntity[];

}
