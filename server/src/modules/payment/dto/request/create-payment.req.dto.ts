import {IsNumber, IsString} from 'class-validator';

export class CreatePaymentReqDto {

  @IsNumber()
  public sum: number;

  @IsString()
  public date: Date;

  @IsString()
  public order: string;

}
