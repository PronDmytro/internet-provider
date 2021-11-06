import {IsBoolean, IsString} from 'class-validator';

export class CreateOrderReqDto {

  @IsString()
  public client: string;

  @IsString()
  public contributor: string;

  @IsString()
  public orderDate: Date;

  @IsString()
  public service: string;

  @IsString()
  public workStatus: string;

  @IsBoolean()
  public paymentStatus: boolean;

}
