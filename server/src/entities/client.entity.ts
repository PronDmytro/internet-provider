import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {IsString} from 'class-validator';

@Entity('Client')
export class ClientEntity {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @IsString()
  @Column({nullable: false, length: 50})
  public PIB: string;

  @IsString()
  @Column({nullable: false})
  public dateBirthday: Date;

  @IsString()
  @Column({unique: true, nullable: false, length: 12})
  public telephone: string;

  @IsString()
  @Column({unique: true, nullable: false, length: 50})
  public email: string;

  @IsString()
  @Column({default: 0})
  public deposit: number;

  @IsString()
  @Column({nullable: false, length: 100})
  public address: string;


}
