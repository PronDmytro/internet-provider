import {IsNumber, IsString} from 'class-validator';

export class UpdatePaymentReqDto {

  @IsString()
  public id: string;

  @IsNumber()
  public sum: number;

  @IsString()
  public date: Date;

  @IsString()
  public order: string;

}
