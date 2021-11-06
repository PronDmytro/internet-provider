import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {IsEmail, IsMobilePhone, IsString} from 'class-validator';
import {PositionEntity} from './position.entity';

@Entity('Employee')
export class EmployeeEntity {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @IsString()
  @Column({nullable: false, length: 50})
  public PIB: string;

  @IsString()
  @Column({unique: true, nullable: false, length: 50})
  public passportId: string;

  @IsString()
  @Column({nullable: false, type: 'date'})
  public dateBirthday: Date;

  @IsMobilePhone()
  @Column({unique: true, nullable: false, length: 12})
  public telephone: string;

  @IsEmail()
  @Column({unique: true, nullable: false, length: 50})
  public email: string;

  @IsString()
  @Column({nullable: false, length: 100})
  public address: string;

  @ManyToOne((type) => PositionEntity)
  public position: PositionEntity;

}
