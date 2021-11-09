import {IsNumber, IsString} from 'class-validator';

export class CreatePaymentReqDto {

  @IsNumber()
  public sum: number;

  @IsString()
  public order: string;

}
